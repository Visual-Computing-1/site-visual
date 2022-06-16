precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];

// we need our interpolated tex coord
varying vec2 texcoords2;

vec3 protanopia(vec3 texel,float[9] mask){
  vec4 convolution;
  convolution.r = mask[0] * texel.r + mask[1] * texel.g + texel.b * mask[2];
  convolution.g = mask[3] * texel.r + mask[4] * texel.g + texel.b * mask[5];
  convolution.b = mask[6] * texel.r + mask[7] * texel.g + texel.b * mask[8];
  return convolution.rgb;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  // 4. Set color from convolution
  gl_FragColor = vec4((vec3(protanopia(texel.rgb,mask))), 1.0); 
}