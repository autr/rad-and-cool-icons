
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

export default { vec2_from_angle, circle }