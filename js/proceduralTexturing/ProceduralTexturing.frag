// Procedural Texturing using Truchet Pattern

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;
uniform int u_option;

float random(in vec2 coord) {
    return fract(sin(dot(coord.xy, vec2(12.9898,78.233)))* 43758.5453123*u_seed);
}

vec2 truchetPattern(in vec2 pos, in float index){
    index = fract(((index-0.5)*2.0));
    if (index > 0.75) {
        pos = vec2(1.0) - pos;
    } else if (index > 0.5) {
        pos = vec2(1.0-pos.x, pos.y);
    } else if (index > 0.25) {
        pos = 1.0-vec2(1.0-pos.x, pos.y);
    }
    return pos;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.0;
    st = (st - vec2(5.0)) * (abs(sin(u_time * 0.2)) * 5.0);

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 tile = truchetPattern(fpos, random(ipos));

    float color = 0.0;

    if(u_option == 1) { // Circles
        color = (
            (
                step(length(tile), 0.6) -
                step(length(tile), 0.4)
            ) +
            (
                step(length(tile - vec2(1.0)), 0.6) -
                step(length(tile - vec2(1.0)), 0.4)
            )
        );
    } else if(u_option == 2) { // Truchet (2 triangles)
        color = step(tile.x, tile.y);
    } else { // Maze
        color = smoothstep(tile.x - 0.3, tile.x, tile.y) - smoothstep(tile.x, tile.x + 0.3, tile.y);
    }
    gl_FragColor = vec4(vec3(color), 1.0);
}
