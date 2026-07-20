import * as THREE from 'three'

const SNOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

export interface OrbUniforms {
  uTime: { value: number }
  uAudioAmp: { value: number }
  uSparkle: { value: number }
  uBaseAmp: { value: number }
  uScroll: { value: number }
  uSpectrum: { value: THREE.Color }
}

export type OrbMaterial = THREE.MeshPhysicalMaterial & { userData: { uniforms: OrbUniforms } }

export function createOrbMaterial(): OrbMaterial {
  const uniforms: OrbUniforms = {
    uTime: { value: 0 },
    uAudioAmp: { value: 0 },
    uSparkle: { value: 0 },
    uBaseAmp: { value: 0.14 },
    uScroll: { value: 0 },
    uSpectrum: { value: new THREE.Color(0x5b6cff) },
  }
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xe4eaff,
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.62,
    ior: 1.45,
    thickness: 1.4,
    iridescence: 1.0,
    iridescenceIOR: 1.35,
    iridescenceThicknessRange: [100, 800],
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.75,
    transparent: true,
    attenuationColor: new THREE.Color(0xbfd0ff),
    attenuationDistance: 1.4,
  })
  mat.userData.uniforms = uniforms
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uAudioAmp = uniforms.uAudioAmp
    shader.uniforms.uBaseAmp = uniforms.uBaseAmp
    shader.uniforms.uScroll = uniforms.uScroll
    shader.uniforms.uSpectrum = uniforms.uSpectrum
    shader.uniforms.uSparkle = uniforms.uSparkle

    shader.vertexShader =
      'uniform float uTime, uAudioAmp, uBaseAmp, uScroll;\n' + SNOISE + '\n' +
      'vec3 tim_displace(vec3 dir){ float n = snoise(dir*1.5 + uTime*0.18); float amp = uBaseAmp + uAudioAmp*0.5; float r = 1.0 + n*amp; return dir * r * (1.0 + uScroll*0.1); }\n' +
      shader.vertexShader

    shader.vertexShader = shader.vertexShader.replace(
      '#include <beginnormal_vertex>',
      [
        'vec3 tim_dir = normalize(position);',
        'vec3 tRef = abs(tim_dir.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0);',
        'vec3 tim_t1 = normalize(cross(tRef, tim_dir));',
        'vec3 tim_t2 = normalize(cross(tim_dir, tim_t1));',
        'float tim_e = 0.02;',
        'vec3 tim_p0 = tim_displace(tim_dir);',
        'vec3 tim_pa = tim_displace(normalize(tim_dir + tim_t1*tim_e));',
        'vec3 tim_pb = tim_displace(normalize(tim_dir + tim_t2*tim_e));',
        'vec3 objectNormal = normalize(cross(tim_pa - tim_p0, tim_pb - tim_p0));',
        'if (dot(objectNormal, tim_dir) < 0.0) objectNormal = -objectNormal;',
        '#ifdef USE_TANGENT',
        '  vec3 objectTangent = vec3( tangent.xyz );',
        '#endif',
      ].join('\n')
    )

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      'vec3 transformed = tim_p0;'
    )

    shader.fragmentShader = 'uniform vec3 uSpectrum; uniform float uSparkle;\n' + shader.fragmentShader
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      [
        '#include <emissivemap_fragment>',
        '{',
        // sweep the SOUND-headline gradient (indigo -> cyan -> magenta) across the surface
        '  float tg = clamp(0.5 + 0.62 * normal.x, 0.0, 1.0);',
        '  vec3 tA = vec3(0.357, 0.424, 1.0);',   // indigo  #5B6CFF
        '  vec3 tB = vec3(0.494, 0.909, 1.0);',   // cyan    #7EE8FF
        '  vec3 tC = vec3(1.0, 0.302, 0.824);',   // magenta #FF4DD2
        '  vec3 tGrad = tg < 0.5 ? mix(tA, tB, tg * 2.0) : mix(tB, tC, (tg - 0.5) * 2.0);',
        '  totalEmissiveRadiance += tGrad * 0.44 + uSpectrum * (0.06 + uSparkle * 0.3);',
        '}',
      ].join('\n')
    )
  }
  return mat as OrbMaterial
}
