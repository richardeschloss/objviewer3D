'use strict';

/* Controllers */
document.location.hash = "#/";  // TBD

angular.module('ObjViewer3D.controllers', [])

.controller('ObjViewer3DController', ['$scope', '$compile', function($scope, $compile) {

    /* Private Fields */

    /* Public Fields */
	$scope.updateModel = false;

    /* Private Methods */

    /* Public Methods */

    /* Initialization */

}]).controller('NavbarController', ['$scope', 'fileUploader', function($scope, fileUploader) {

	// Private Fields:

    // Public Fields:
	$scope.myFile = '';

	// Public Methods:
	$scope.upload3dFile = function(){
		var fd = new FormData();
        fd.append('file', $scope.myFile);

		fileUploader.upload($scope.myFile, '/upload3dFile', function(data){
			$scope.$parent.uploadedFile = data.uploadedFile;
			$scope.$parent.updateModel = true;
		});
	}

    // Initialization:

}]).controller('HomeController', ['$scope', 'Backend', function($scope, Backend) {

	/* Private Fields */
	var container, stats;
	var camera, manager, scene, renderer, texture;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	/* Private Methods */
	var createScene = function(){
		scene = new THREE.Scene();
		var ambient = new THREE.AmbientLight( 0x101030 );
		scene.add( ambient );

		var directionalLight = new THREE.DirectionalLight( 0xffeedd );
		directionalLight.position.set( 0, 0, 1 );
		scene.add( directionalLight );
	}

	var initCamera = function(){
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 100;
	}

	var oldObj;

	$scope.loadOBJModel = function(){
		var loader = new THREE.OBJLoader( manager );
		loader.load( $scope.$parent.uploadedFile, function ( object ) {
			object.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = texture;
				}

			} );

			object.position.y = - 80;
			if( oldObj != null )
				scene.remove( oldObj )
			scene.add( object );
			oldObj = object;
			$scope.$parent.updateModel = false;
		} );
	}

	var loadTexture = function(){
		manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
			console.log( item, loaded, total );
		};

		texture = new THREE.Texture();
		var loader = new THREE.ImageLoader( manager );
		loader.load( './assets/textures/UV_Grid_Sm.jpg', function ( image ) {
			texture.image = image;
			texture.needsUpdate = true;

		} );
	}

	function init() {

		container = document.createElement( 'div' );
		document.body.appendChild( container );

		// Camera
		initCamera();

		// Scene
		createScene();

		// Texture
		loadTexture();
		
		// model
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	function render() {
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}

	/* Public Methods */

	/* Initialization */
	init();
	animate();

}]);
