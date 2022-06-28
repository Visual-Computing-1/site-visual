precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];
uniform vec2 mouse_position;
uniform float filter_selected;
uniform bool grey_scale;



// we need our interpolated tex coord
varying vec2 texcoords2;

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

  }
}



void main() {
    gl_FragColor = vec4(applyFilters(), 1.0);
}