precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];
uniform float mask_correction[9];
uniform float error_matrix[9];
uniform vec2 mouse_position;
uniform float filter_selected;
uniform bool grey_scale;



// we need our interpolated tex coord
varying vec2 texcoords2;

vec3 colorCorrection(vec3 texel,float[9] mask,float[9] mask_correction){
    float  L = 17.8824 * texel.r + 43.5161 * texel.g + 4.11935 * texel.b;
    float  M = 3.45565 * texel.r + 27.1551 * texel.g + 3.86714 * texel.b;
    float  S = 0.02999566 * texel.r + 0.184309 * texel.g + 1.46709 * texel.b;
    float l =
        mask[0] * L +
        mask[1] * M +
        mask[2] * S;
    float m =
        mask[3] * L +
        mask[4] * M +
        mask[5] * S;
    float s =
        mask[6] * L +
        mask[7] * M +
        mask[8] * S;
    float Ri = 0.0809444479 * l + -0.130504409 * m + 0.116721066 * s;
    float Gi = 0.113614708 * l + -0.0102485335 * m + 0.0540193266 * s;
    float Bi = -0.000365296938 * l + -0.00412161469 * m + 0.693511405 * s;

    float RR = texel.r - Ri;
    float GR = texel.g - Gi;
    float BR = texel.b - Bi;

    float Rmap = 
        mask_correction[0] * RR +
        mask_correction[1] * GR +
        mask_correction[2] * BR;
    float Gmap = 
        mask_correction[3] * RR +
        mask_correction[4] * GR +
        mask_correction[5] * BR;
    float Bmap = 
        mask_correction[6] * RR +
        mask_correction[7] * GR +
        mask_correction[8] * BR;
    float R = texel.r + Rmap;
    float G = texel.g + Gmap;
    float B = texel.b + Bmap;
    if(R < 0.0){
      R = 0.0;
    } 
    if(R > 255.0){
      R = 255.0;
    } 
    if(G < 0.0){
      G = 0.0;
    } 
    if(G > 255.0){
      G = 255.0;
    } 
    if(B < 0.0){
      B = 0.0;
    } 
    if(B > 255.0){
      B = 255.0;
    } 

  return vec3(R,G,B);
}

vec3 filter(vec3 texel,float[9] mask){
  vec4 convolution;
  convolution.r = mask[0] * texel.r + mask[1] * texel.g + texel.b * mask[2];
  convolution.g = mask[3] * texel.r + mask[4] * texel.g + texel.b * mask[5];
  convolution.b = mask[6] * texel.r + mask[7] * texel.g + texel.b * mask[8];
  return convolution.rgb;
}

vec3 applyFilters() {

  if (filter_selected == 1.0){
    vec4 texel = texture2D(texture, texcoords2);
    vec2 st = gl_FragCoord.xy; 
    vec2 mouse = vec2(mouse_position.x, 600.0 - mouse_position.y);
    vec3 result;
    if(distance(st,mouse)< 80.0){

      vec4 texel = texture2D(texture, vec2((mouse.x/600.0) + (texcoords2.x - mouse.x/600.0),(mouse.y/600.0) + (texcoords2.y - mouse.y/600.0)));
      vec3 mask_color_blindness =  filter(texel.rgb,mask);
      float r = mask_color_blindness.r;
      float g = mask_color_blindness.g;
      float b = mask_color_blindness.b;

      return (vec3(r,g,b));

    }else{

      vec4 color = texture2D(texture, texcoords2);

      float r = color.r;
      float g = color.g;
      float b = color.b;

      return (vec3(r,g,b));
    }
  }else if(filter_selected == 2.0) {

      vec4 texel = texture2D(texture, texcoords2);
      vec3 mask_color_blindness =  filter(texel.rgb,mask);
      float r = mask_color_blindness.r;
      float g = mask_color_blindness.g;
      float b = mask_color_blindness.b;
      return (vec3(r,g,b));

  }else if(filter_selected == 0.0){
      vec4 texel = texture2D(texture, texcoords2);
      vec3 mask_color_blindness_correction =  colorCorrection(filter(texel.rgb,mask),mask_correction,error_matrix);
      float r = mask_color_blindness_correction.r;
      float g = mask_color_blindness_correction.g;
      float b = mask_color_blindness_correction.b;
      return (vec3(r,g,b));

  }
}



void main() {
    gl_FragColor = vec4(applyFilters(), 1.0);
}