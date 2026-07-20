import * as THREE from 'three'

// Shared compact Ashima simplex noise (used in the vertex shader).
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

const vertex = /* glsl */ `
uniform float uTime, uAudioAmp, uBaseAmp, uScroll, uPixelRatio, uReveal;
attribute float aRand;
varying float vRand; varying float vTw; varying float vRadial;
${SNOISE}
void main(){
  vRand = aRand;
  vec3 dir = normalize(position);
  // per-particle flowing displacement of the sphere radius
  float n = snoise(dir * 1.5 + uTime * 0.14 + aRand * 4.0);
  float pulse = uAudioAmp * (0.55 + 0.45 * sin(aRand * 22.0 + uTime * 3.0));
  float radius = 1.0 + n * uBaseAmp + pulse * 0.85;
  // reveal: particles fly in from farther out on load
  radius = mix(radius + 1.6, radius, clamp(uReveal, 0.0, 1.0));
  vRadial = n;
  vec3 pos = dir * radius * (1.0 + uScroll * 0.12);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float tw = 0.5 + 0.5 * sin(uTime * 2.2 + aRand * 40.0);
  vTw = tw;
  float size = (1.6 + 5.5 * aRand) * (0.75 + 0.7 * tw) + uAudioAmp * 9.0 * aRand;
  gl_PointSize = size * uPixelRatio * (10.0 / -mv.z) * clamp(uReveal, 0.15, 1.0);
  gl_Position = projectionMatrix * mv;
}`

const fragment = /* glsl */ `
precision highp float;
uniform vec3 uSpectrum; uniform float uSparkle; uniform float uTime;
varying float vRand; varying float vTw; varying float vRadial;
vec3 spectral(float t){ return 0.5 + 0.5 * cos(6.2831 * (t + vec3(0.0, 0.33, 0.66))); }
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);           // soft round speck
  float core = smoothstep(0.28, 0.0, d);          // bright center
  vec3 base = spectral(vRand * 1.2 + vRadial * 0.6 + uTime * 0.02);
  vec3 col = mix(base, uSpectrum, 0.45);
  col += core * 0.6 + uSparkle * vTw * 0.7;        // sparkle from treble
  float a = glow * (0.35 + 0.65 * vTw);
  gl_FragColor = vec4(col, a);
}`

export function createOrbMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAudioAmp: { value: 0 },
      uSparkle: { value: 0 },
      uBaseAmp: { value: 0.22 },
      uScroll: { value: 0 },
      uReveal: { value: 0 },
      uPixelRatio: { value: 1 },
      uSpectrum: { value: new THREE.Color(0x5b6cff) },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  })
}
