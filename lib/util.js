
function vec2_from_angle(angle, dist, center) {
	const {x,y} = center || {x: 0, y: 0}
	return {
		x: Math.cos(angle * Math.PI / 180.0) * dist + x,
		y: Math.sin(angle * Math.PI / 180.0) * dist + y
	}
}

function circle( radius, points ) {
	let d = 'M'
	for( let i = 0; i < points; i++) {
		const angle = ((360 / points) * i)
		const p = vec2_from_angle( angle, radius)
		if (i > 0) d += 'L'
		d += `${p.x} ${p.y} `
	}
	d += 'Z'
	return d
}

function polar_to_cartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describe_arc(x, y, radius, startAngle, endAngle){

    var start = polar_to_cartesian(x, y, radius, endAngle);
    var end = polar_to_cartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

export default { vec2_from_angle, circle, describe_arc, describe_arc }