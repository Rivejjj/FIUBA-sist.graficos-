


function Trail(maxPoints,initialPos,tone){


    var points=[];
    var frame=0;


	var segments = maxPoints;
    
    var trailsGeo = new THREE.BufferGeometry();
    var trailsMat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

    var positions = new Float32Array( segments * 3 );
    var colors = new Float32Array( segments * 3 );

    
    for ( var i = 0; i < segments; i ++ ) {

        // positions
        positions[ i * 3 ] = initialPos.x;
        positions[ i * 3 + 1 ] = initialPos.y;
        positions[ i * 3 + 2 ] = initialPos.z;
        
		var col = new THREE.Color();
		var sat = 0.5*i/segments+0.5;
		col.setHSL(tone,1,sat);

        colors[ i * 3 ] = col.r;
        colors[ i * 3 + 1 ] =col.g;
        colors[ i * 3 + 2 ] =col.b;
    }	
    
    
    trailsGeo.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    trailsGeo.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    trailsGeo.computeBoundingSphere();

    var trailsMesh = new THREE.Line( trailsGeo, trailsMat );
    scene.add( trailsMesh );

    this.reset=function(){
        points=[];
    }

    this.pushPosition=function(pos){

	    
	    points.push(pos);
        if (points.length>maxPoints) points.shift();
        if (frame<1) points.shift();

	    if (trailsGeo && points.length>10){
            var att=trailsGeo.getAttribute("position");
            var att2=trailsGeo.getAttribute("color");

              for (var i=0;i< maxPoints;i++)  {
                
                if (i<points.length) j=i;
                else j=points.length-1;

                var col = new THREE.Color();
                var sat = 0.5*j/points.length+0.1;
                col.setHSL(tone,1,sat);


                att.setXYZ(i,points[j].x,points[j].y,points[j].z);
                att2.setXYZ(i,col.r,col.g,col.b);
              }
	        
              att.needsUpdate=true;
              att2.needsUpdate=true;

	    }//if
        frame++;
    }


}