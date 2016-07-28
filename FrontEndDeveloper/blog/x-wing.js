/* 
Xwing
Made by Kevin Jannis (@kevinjannis)
Inspired by: http://blenderartists.org/forum/showthread.php?260734-X-Wing-Fighter-Low-Poly-3D-Model-By-PixelOz
View more at www.janniskev.in
*/

var scene,
    camera,
    cubeCamera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    shadowLight,
    backLight,
    light,
    renderer,
    container;

var screenCenter,
    radius,
    stars,
    maxStars,
    hyperspace,
    width,
    height;

var baseMaterial,
    accentMaterial,
    starMaterial,
    darkMaterial,
    glassMaterial,
    fireMaterial;

function init() {
  scene = new THREE.Scene();

  width = document.getElementById('scene').clientWidth;
  height = document.getElementById('scene').clientHeight;

  aspectRatio = width / height;

  screenCenter = { x: width / 2, y: height / 2 };

  radius = 4000;
  stars = [];
  maxStars = 350;
  hyperspace = 1;

  fieldOfView = 20;
  nearPlane = 1;
  farPlane = 20000;

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  container = document.getElementById('scene');
  container.appendChild(renderer.domElement);

  baseMaterial = new THREE.MeshPhongMaterial({
    color: 0xeeeeee,
    emissive: 0x000000,
    specular: 0xffffff,
    shading: THREE.FlatShading,
    shininess: 20,
    metal: true
  });

  darkMaterial = new THREE.MeshPhongMaterial({
    color: 0x555555,
    shading: THREE.FlatShading,
    shininess: 3
  });

  glassMaterial = new THREE.MeshPhongMaterial({
    color: 0x474760,
    shading: THREE.FlatShading,
    shininess: 3
  });

  starMaterial = new THREE.MeshPhongMaterial({
    color: 0xeeeeee,
    emissive: 0x000000,
    specular: 0xffffff,
    shading: THREE.FlatShading,
    shininess: 20
  });

  fireMaterial = new THREE.MeshPhongMaterial({
    color: 0x9c2a00,
    emissive: 0x000000,
    specular: 0xffffff,
    shading: THREE.FlatShading,
    shininess: 20
  });

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  height = window.innerHeight;
  width = window.innerWidth;

  aspectRatio = width / height;

  renderer.setSize(width, height);
  camera.aspect = aspectRatio;

  camera.updateProjectionMatrix();
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .45)

  shadowLight = new THREE.DirectionalLight(0xffffff, .6);
  shadowLight.position.set(200, 200, 200);
  shadowLight.shadowDarkness = 1;
  shadowLight.castShadow = true;

  backLight = new THREE.DirectionalLight(0xffffff, .6);
  backLight.position.set(100, -200, 50);
  backLight.shadowDarkness = 1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createXWing(x, y, z, color) {
  accentMaterial = new THREE.MeshPhongMaterial({
    color: color,
    shading: THREE.FlatShading,
    shininess: 3
  });

  var xWing = new XWing();

  xWing.group.position.x = x;
  xWing.group.position.y = y;
  xWing.group.position.z = z;

  scene.add(xWing.group);

  return xWing;
}

function XWing() {
  this.group = new THREE.Group();

  var cubeCamera = new THREE.CubeCamera(nearPlane, farPlane, 200);
  scene.add(cubeCamera);

  var body = createBody();

  body.position.x = 347;
  body.rotation.x = -Math.PI / 2;
  body.rotation.y = Math.PI;

  this.group.add(body);

  var topLeftWing = createWing();

  topLeftWing.position.y = 55;
  topLeftWing.position.z = -135;
  topLeftWing.rotation.x = -Math.PI / 2.65;

  this.group.add(topLeftWing);

  var topRightWing = createWing(true);

  topRightWing.position.y = 48;
  topRightWing.position.z = 138;
  topRightWing.rotation.x = Math.PI / 2.65;

  this.group.add(topRightWing);

  var bottomLeftWing = createWing(true);

  bottomLeftWing.position.y = -42;
  bottomLeftWing.position.z = -139;
  bottomLeftWing.rotation.x = -Math.PI / 1.65;

  this.group.add(bottomLeftWing);

  var bottomRightWing = createWing();

  bottomRightWing.position.y = -48;
  bottomRightWing.position.z = 138;
  bottomRightWing.rotation.x = Math.PI / 1.65;

  this.group.add(bottomRightWing);

  // TODO
  this.group.rotation.y = Math.PI / 2;

  cubeCamera.position.copy(this.group.position);
  cubeCamera.updateCubeMap(renderer, scene);
}

XWing.prototype = {
  takeoff: function () {

  },
  land: function () {

  }
};

function createBody() {
  var body = new THREE.Group();

  // Tip
  var tipGeometry = new THREE.Geometry();

  tipGeometry.vertices.push(
    // Start
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(0, 5, 0),

    // First row
    new THREE.Vector3(9.3, -5, 4),
    new THREE.Vector3(9.3, 5, 4),

    new THREE.Vector3(9.3, -8, 0),
    new THREE.Vector3(9.3, 8, 0),

    new THREE.Vector3(8, -7.5, -1.3),
    new THREE.Vector3(8, 7.5, -1.3),

    new THREE.Vector3(7.1, -6.2, -2.6),
    new THREE.Vector3(7.1, 6.2, -2.6),

    new THREE.Vector3(6.5, -5, -4),
    new THREE.Vector3(6.5, 5, -4),

    // Second row
    new THREE.Vector3(16.6, -5, 6),
    new THREE.Vector3(16.6, 5, 6),

    new THREE.Vector3(16.6, -10, 0),
    new THREE.Vector3(16.6, 10, 0),

    new THREE.Vector3(14.4, -8.8, -2),
    new THREE.Vector3(14.4, 8.8, -2),

    new THREE.Vector3(12.2, -7.4, -4),
    new THREE.Vector3(12.2, 7.4, -4),

    new THREE.Vector3(11, -5, -6),
    new THREE.Vector3(11, 5, -6),

    // Third row
    new THREE.Vector3(23.3, -5, 8),
    new THREE.Vector3(23.3, 5, 8),

    new THREE.Vector3(23.3, -12, 0),
    new THREE.Vector3(23.3, 12, 0),

    new THREE.Vector3(21.1, -10.4, -2.7),
    new THREE.Vector3(21.1, 10.4, -2.7),

    new THREE.Vector3(19.8, -8.4, -5.7),
    new THREE.Vector3(19.8, 8.4, -5.7),

    new THREE.Vector3(16, -5, -8.7),
    new THREE.Vector3(16, 5, -8.7),

    // Fourth row
    new THREE.Vector3(30, -5, 8.5),
    new THREE.Vector3(30, 5, 8.5),

    new THREE.Vector3(30.6, -13, 0),
    new THREE.Vector3(30.6, 13, 0),

    new THREE.Vector3(28.1, -11, -3.7),
    new THREE.Vector3(28.1, 11, -3.7),

    new THREE.Vector3(25.5, -8.3, -8.5),
    new THREE.Vector3(25.5, 8.3, -8.5),

    new THREE.Vector3(23, -5, -11.3),
    new THREE.Vector3(23, 5, -11.3),

    // Fifth row
    new THREE.Vector3(38, -5, 8.8),
    new THREE.Vector3(38, 5, 8.8),

    new THREE.Vector3(38.8, -13.7, 0),
    new THREE.Vector3(38.8, 13.7, 0),

    new THREE.Vector3(35, -11.7, -4.2),
    new THREE.Vector3(35, 11.7, -4.2),

    new THREE.Vector3(30.5, -9, -8.6),
    new THREE.Vector3(30.5, 9, -8.6),

    new THREE.Vector3(28, -5, -12.6),
    new THREE.Vector3(28, 5, -12.6),

    // Sixth row
    new THREE.Vector3(45.3, -5, 8.9),
    new THREE.Vector3(45.3, 5, 8.9),

    new THREE.Vector3(47, -14.2, 0),
    new THREE.Vector3(47, 14.2, 0),

    new THREE.Vector3(42.6, -12.5, -4.6),
    new THREE.Vector3(42.6, 12.5, -4.6),

    new THREE.Vector3(38.3, -8.9, -9.2),
    new THREE.Vector3(38.3, 8.9, -9.2),

    new THREE.Vector3(34, -5, -13.9),
    new THREE.Vector3(34, 5, -13.9),

    // Seventh row
    new THREE.Vector3(54, -5, 8),
    new THREE.Vector3(54, 5, 8),

    new THREE.Vector3(58, -15, 0),
    new THREE.Vector3(58, 15, 0),

    new THREE.Vector3(53, -12.6, -5.1),
    new THREE.Vector3(53, 12.6, -5.1),

    new THREE.Vector3(48, -9.5, -10.2),
    new THREE.Vector3(48, 9.5, -10.2),

    new THREE.Vector3(43, -5, -15.3),
    new THREE.Vector3(43, 5, -15.3),

    // Top inlay
    new THREE.Vector3(11, -5, -6),
    new THREE.Vector3(11, 5, -6),

    new THREE.Vector3(16, -3, -6.7),
    new THREE.Vector3(16, 3, -6.7),

    new THREE.Vector3(16, -3, -8.7),
    new THREE.Vector3(16, 3, -8.7),

    new THREE.Vector3(23, -3, -9.3),
    new THREE.Vector3(23, 3, -9.3),

    new THREE.Vector3(23, -3, -11.3),
    new THREE.Vector3(23, 3, -11.3),

    new THREE.Vector3(28, -3, -10.6),
    new THREE.Vector3(28, 3, -10.6),

    new THREE.Vector3(28, -3, -12.6),
    new THREE.Vector3(28, 3, -12.6),

    new THREE.Vector3(34, -3, -11.9),
    new THREE.Vector3(34, 3, -11.9),

    new THREE.Vector3(34, -3, -13.9),
    new THREE.Vector3(34, 3, -13.9),

    new THREE.Vector3(41, -3, -12),
    new THREE.Vector3(41, 3, -12),

    new THREE.Vector3(41, -3, -15.3),
    new THREE.Vector3(41, 3, -15.3),

    new THREE.Vector3(43, -5, -15.3),
    new THREE.Vector3(43, 5, -15.3)
  );

  tipGeometry.faces.push(
    // First row
    new THREE.Face3(2, 1, 0),
    new THREE.Face3(1, 2, 3),

    new THREE.Face3(4, 2, 0),
    new THREE.Face3(1, 3, 5),

    new THREE.Face3(6, 4, 0),
    new THREE.Face3(1, 5, 7),

    new THREE.Face3(8, 6, 0),
    new THREE.Face3(1, 7, 9),

    new THREE.Face3(10, 8, 0),
    new THREE.Face3(1, 9, 11),

    new THREE.Face3(0, 1, 10),
    new THREE.Face3(11, 10, 1),

    // Second row
    new THREE.Face3(12, 3, 2),
    new THREE.Face3(3, 12, 13),

    new THREE.Face3(14, 12, 2),
    new THREE.Face3(2, 4, 14),

    new THREE.Face3(15, 5, 3),
    new THREE.Face3(3, 13, 15),

    new THREE.Face3(16, 14, 4),
    new THREE.Face3(4, 6, 16),

    new THREE.Face3(17, 7, 5),
    new THREE.Face3(5, 15, 17),

    new THREE.Face3(18, 16, 6),
    new THREE.Face3(6, 8, 18),

    new THREE.Face3(19, 9, 7),
    new THREE.Face3(7, 17, 19),

    new THREE.Face3(20, 18, 8),
    new THREE.Face3(8, 10, 20),

    new THREE.Face3(21, 11, 9),
    new THREE.Face3(9, 19, 21),

    // Third row
    new THREE.Face3(22, 13, 12),
    new THREE.Face3(13, 22, 23),

    new THREE.Face3(24, 22, 12),
    new THREE.Face3(12, 14, 24),

    new THREE.Face3(25, 15, 13),
    new THREE.Face3(13, 23, 25),

    new THREE.Face3(26, 24, 14),
    new THREE.Face3(14, 16, 26),

    new THREE.Face3(27, 17, 15),
    new THREE.Face3(15, 25, 27),

    new THREE.Face3(28, 26, 16),
    new THREE.Face3(16, 18, 28),

    new THREE.Face3(29, 19, 17),
    new THREE.Face3(17, 27, 29),

    new THREE.Face3(30, 28, 18),
    new THREE.Face3(18, 20, 30),

    new THREE.Face3(31, 21, 19),
    new THREE.Face3(19, 29, 31),

    // Fourth row
    new THREE.Face3(32, 23, 22),
    new THREE.Face3(23, 32, 33),

    new THREE.Face3(34, 32, 22),
    new THREE.Face3(22, 24, 34),

    new THREE.Face3(35, 25, 23),
    new THREE.Face3(23, 33, 35),

    new THREE.Face3(36, 34, 24),
    new THREE.Face3(24, 26, 36),

    new THREE.Face3(37, 27, 25),
    new THREE.Face3(25, 35, 37),

    new THREE.Face3(38, 36, 26),
    new THREE.Face3(26, 28, 38),

    new THREE.Face3(39, 29, 27),
    new THREE.Face3(27, 37, 39),

    new THREE.Face3(40, 38, 28),
    new THREE.Face3(28, 30, 40),

    new THREE.Face3(41, 31, 29),
    new THREE.Face3(29, 39, 41),

    // Fifth row
    new THREE.Face3(42, 33, 32),
    new THREE.Face3(33, 42, 43),

    new THREE.Face3(44, 42, 32),
    new THREE.Face3(32, 34, 44),

    new THREE.Face3(45, 35, 33),
    new THREE.Face3(33, 43, 45),

    new THREE.Face3(46, 44, 34),
    new THREE.Face3(34, 36, 46),

    new THREE.Face3(47, 37, 35),
    new THREE.Face3(35, 45, 47),

    new THREE.Face3(48, 46, 36),
    new THREE.Face3(36, 38, 48),

    new THREE.Face3(49, 39, 37),
    new THREE.Face3(37, 47, 49),

    new THREE.Face3(50, 48, 38),
    new THREE.Face3(38, 40, 50),

    new THREE.Face3(51, 41, 39),
    new THREE.Face3(39, 49, 51),

    // Sixth row
    new THREE.Face3(52, 43, 42),
    new THREE.Face3(43, 52, 53),

    new THREE.Face3(54, 52, 42),
    new THREE.Face3(42, 44, 54),

    new THREE.Face3(55, 45, 43),
    new THREE.Face3(43, 53, 55),

    new THREE.Face3(56, 54, 44),
    new THREE.Face3(44, 46, 56),

    new THREE.Face3(57, 47, 45),
    new THREE.Face3(45, 55, 57),

    new THREE.Face3(58, 56, 46),
    new THREE.Face3(46, 48, 58),

    new THREE.Face3(59, 49, 47),
    new THREE.Face3(47, 57, 59),

    new THREE.Face3(60, 58, 48),
    new THREE.Face3(48, 50, 60),

    new THREE.Face3(61, 51, 49),
    new THREE.Face3(49, 59, 61),

    // Seventh row
    new THREE.Face3(62, 53, 52),
    new THREE.Face3(53, 62, 63),

    new THREE.Face3(64, 62, 52),
    new THREE.Face3(52, 54, 64),

    new THREE.Face3(65, 55, 53),
    new THREE.Face3(53, 63, 65),

    new THREE.Face3(66, 64, 54),
    new THREE.Face3(54, 56, 66),

    new THREE.Face3(67, 57, 55),
    new THREE.Face3(55, 65, 67),

    new THREE.Face3(68, 66, 56),
    new THREE.Face3(56, 58, 68),

    new THREE.Face3(69, 59, 57),
    new THREE.Face3(57, 67, 69),

    new THREE.Face3(70, 68, 58),
    new THREE.Face3(58, 60, 70),

    new THREE.Face3(71, 61, 59),
    new THREE.Face3(59, 69, 71),

    // Top
    new THREE.Face3(21, 20, 10),
    new THREE.Face3(10, 11, 21),

    new THREE.Face3(72, 73, 74),
    new THREE.Face3(75, 74, 73),

    new THREE.Face3(74, 76, 20),
    new THREE.Face3(77, 75, 21),

    new THREE.Face3(76, 30, 20),
    new THREE.Face3(21, 31, 77),

    ///
    new THREE.Face3(74, 75, 78),
    new THREE.Face3(79, 78, 75),

    new THREE.Face3(76, 40, 30),
    new THREE.Face3(40, 76, 80),

    new THREE.Face3(74, 78, 80),
    new THREE.Face3(72, 74, 80),

    new THREE.Face3(31, 41, 77),
    new THREE.Face3(81, 77, 41),

    new THREE.Face3(81, 79, 75),
    new THREE.Face3(81, 75, 73),

    ///
    new THREE.Face3(78, 79, 82),
    new THREE.Face3(83, 82, 79),

    new THREE.Face3(80, 50, 40),
    new THREE.Face3(50, 80, 84),

    new THREE.Face3(78, 82, 84),
    new THREE.Face3(76, 78, 84),

    new THREE.Face3(41, 51, 81),
    new THREE.Face3(85, 81, 51),

    new THREE.Face3(85, 83, 79),
    new THREE.Face3(85, 79, 77),

    ///
    new THREE.Face3(82, 83, 86),
    new THREE.Face3(87, 86, 73),

    new THREE.Face3(84, 60, 50),
    new THREE.Face3(60, 84, 88),

    new THREE.Face3(82, 86, 88),
    new THREE.Face3(80, 82, 88),

    new THREE.Face3(51, 61, 85),
    new THREE.Face3(89, 85, 61),

    new THREE.Face3(89, 87, 83),
    new THREE.Face3(89, 83, 81),

    ///
    new THREE.Face3(86, 87, 90),
    new THREE.Face3(91, 90, 77),

    new THREE.Face3(88, 70, 60),
    new THREE.Face3(70, 88, 92),

    new THREE.Face3(86, 90, 92),
    new THREE.Face3(84, 86, 92),

    new THREE.Face3(61, 71, 89),
    new THREE.Face3(93, 89, 71),

    new THREE.Face3(93, 91, 87),
    new THREE.Face3(93, 87, 85),

    ///
    new THREE.Face3(93, 92, 90),
    new THREE.Face3(90, 91, 93),

    new THREE.Face3(95, 94, 92),
    new THREE.Face3(92, 93, 95),

    // End
    new THREE.Face3(64, 63, 62),
    new THREE.Face3(63, 64, 65),

    new THREE.Face3(66, 65, 64),
    new THREE.Face3(65, 66, 67),

    new THREE.Face3(68, 67, 66),
    new THREE.Face3(67, 68, 69),

    new THREE.Face3(70, 69, 68),
    new THREE.Face3(69, 70, 71)
  );

  tipGeometry.computeFaceNormals();

  var tipBase = new THREE.Mesh(tipGeometry, baseMaterial);

  body.add(tipBase);

  // Base body
  var baseGeometry = new THREE.Geometry();

  baseGeometry.vertices.push(
    // top
    new THREE.Vector3(41, -4.5, -14),
    new THREE.Vector3(41, 4.5, -14),

    new THREE.Vector3(160, -9, -22),
    new THREE.Vector3(160, 9, -22),

    // Top Side
    new THREE.Vector3(238, -12, -22),
    new THREE.Vector3(238, 12, -22),

    // Side
    new THREE.Vector3(238, -25, 0),
    new THREE.Vector3(238, 25, 0),

    new THREE.Vector3(40, -11.5, 0),
    new THREE.Vector3(40, 11.5, 0),

    // Bottom Side
    new THREE.Vector3(40, -3, 7),
    new THREE.Vector3(40, 3, 7),

    new THREE.Vector3(238, -12, 7),
    new THREE.Vector3(238, 12, 7),

    // Middle
    new THREE.Vector3(268, -18, 16),
    new THREE.Vector3(268, 18, 16),

    new THREE.Vector3(268, -26, 0),
    new THREE.Vector3(268, 26, 0),

    new THREE.Vector3(268, -10, -30),
    new THREE.Vector3(268, 10, -30),

    new THREE.Vector3(238, -7.1, -30),
    new THREE.Vector3(238, 7.1, -30),

    // Near-End
    new THREE.Vector3(343, -18, 16),
    new THREE.Vector3(343, 18, 16),

    new THREE.Vector3(343, -26, 0),
    new THREE.Vector3(343, 26, 0),

    new THREE.Vector3(343, -10, -30),
    new THREE.Vector3(343, 10, -30),

    // End
    new THREE.Vector3(356, -17, 15),
    new THREE.Vector3(356, 17, 15),

    new THREE.Vector3(356, -24, 0),
    new THREE.Vector3(356, 24, 0),

    new THREE.Vector3(356, -9, -29),
    new THREE.Vector3(356, 9, -29),

    // End 2
    new THREE.Vector3(356, -15, 13),
    new THREE.Vector3(356, 15, 13),

    new THREE.Vector3(356, -22, 0),
    new THREE.Vector3(356, 22, 0),

    new THREE.Vector3(356, -7, -27),
    new THREE.Vector3(356, 7, -27),

    // End Inner
    new THREE.Vector3(353, -15, 13),
    new THREE.Vector3(353, 15, 13),

    new THREE.Vector3(353, -22, 0),
    new THREE.Vector3(353, 22, 0),

    new THREE.Vector3(353, -7, -27),
    new THREE.Vector3(353, 7, -27)
  );

  baseGeometry.faces.push(
    // Top
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(3, 2, 1),

    new THREE.Face3(2, 3, 4),
    new THREE.Face3(5, 4, 3),

    // Top Side
    new THREE.Face3(0, 2, 4),
    new THREE.Face3(5, 3, 1),

    // Side
    new THREE.Face3(0, 4, 6),
    new THREE.Face3(0, 6, 8),

    new THREE.Face3(7, 5, 1),
    new THREE.Face3(9, 7, 1),

    // Bottom Side
    new THREE.Face3(10, 8, 6),
    new THREE.Face3(12, 10, 6),

    new THREE.Face3(7, 9, 11),
    new THREE.Face3(7, 11, 13),

    // Bottom
    new THREE.Face3(12, 11, 10),
    new THREE.Face3(11, 12, 13),

    // Middle
    new THREE.Face3(14, 12, 6),
    new THREE.Face3(7, 13, 15),
    new THREE.Face3(12, 14, 15),
    new THREE.Face3(13, 12, 15),

    new THREE.Face3(16, 14, 6),
    new THREE.Face3(7, 15, 17),

    new THREE.Face3(18, 16, 6),
    new THREE.Face3(7, 17, 19),
    new THREE.Face3(20, 18, 6),
    new THREE.Face3(7, 19, 21),

    new THREE.Face3(20, 19, 18),
    new THREE.Face3(19, 20, 21),

    new THREE.Face3(6, 7, 20),
    new THREE.Face3(21, 20, 7),

    // Near-End
    new THREE.Face3(22, 15, 14),
    new THREE.Face3(15, 22, 23),

    new THREE.Face3(14, 16, 22),
    new THREE.Face3(24, 22, 16),
    new THREE.Face3(23, 17, 15),
    new THREE.Face3(17, 23, 25),

    new THREE.Face3(16, 18, 24),
    new THREE.Face3(26, 24, 18),
    new THREE.Face3(25, 19, 17),
    new THREE.Face3(19, 25, 27),

    new THREE.Face3(18, 19, 26),
    new THREE.Face3(27, 26, 19),

    // End
    new THREE.Face3(28, 23, 22),
    new THREE.Face3(23, 28, 29),

    new THREE.Face3(22, 24, 30),
    new THREE.Face3(30, 28, 22),
    new THREE.Face3(31, 25, 23),
    new THREE.Face3(23, 29, 31),

    new THREE.Face3(24, 26, 32),
    new THREE.Face3(32, 30, 24),
    new THREE.Face3(33, 27, 25),
    new THREE.Face3(25, 31, 33),

    new THREE.Face3(26, 33, 32),
    new THREE.Face3(26, 27, 33),

    // End 2
    new THREE.Face3(34, 29, 28),
    new THREE.Face3(29, 34, 35),

    new THREE.Face3(28, 30, 34),
    new THREE.Face3(36, 34, 30),
    new THREE.Face3(35, 31, 29),
    new THREE.Face3(31, 35, 37),

    new THREE.Face3(30, 32, 36),
    new THREE.Face3(38, 36, 32),
    new THREE.Face3(37, 33, 31),
    new THREE.Face3(33, 37, 39),

    new THREE.Face3(32, 33, 39),
    new THREE.Face3(39, 38, 32),

    // End Inner
    new THREE.Face3(40, 35, 34),
    new THREE.Face3(35, 40, 41),

    new THREE.Face3(34, 36, 40),
    new THREE.Face3(42, 40, 36),
    new THREE.Face3(41, 37, 35),
    new THREE.Face3(37, 41, 43),

    new THREE.Face3(36, 38, 42),
    new THREE.Face3(44, 42, 38),
    new THREE.Face3(43, 39, 37),
    new THREE.Face3(39, 43, 45),

    new THREE.Face3(38, 39, 45),
    new THREE.Face3(45, 44, 38),

    new THREE.Face3(42, 41, 40),
    new THREE.Face3(41, 42, 43),

    new THREE.Face3(45, 43, 42),
    new THREE.Face3(42, 44, 45)
  );

  baseGeometry.computeFaceNormals();

  var bodyBase = new THREE.Mesh(baseGeometry, baseMaterial);

  body.add(bodyBase);

  // Body details
  var detail1Geometry = new THREE.SphereGeometry(6, 16, 16, 0, Math.PI);
  var detail1 = new THREE.Mesh(detail1Geometry, darkMaterial);

  detail1.position.x = 250;
  detail1.position.z = -28;
  detail1.rotation.y = Math.PI;

  body.add(detail1);

  // Window
  var windowGeometry = new THREE.Geometry();

  windowGeometry.vertices.push(
    // Front
    new THREE.Vector3(0, -9, 0),
    new THREE.Vector3(0, 9, 0),

    // Top
    new THREE.Vector3(60, -9, -11),
    new THREE.Vector3(60, 9, -11),

    // Back
    new THREE.Vector3(78, -12, 0),
    new THREE.Vector3(78, 12, 0),

    // Back top
    new THREE.Vector3(78, -7, -8),
    new THREE.Vector3(78, 7, -8)
  );

  windowGeometry.faces.push(
    // Front
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(3, 2, 1),

    // Sides
    new THREE.Face3(0, 2, 4),
    new THREE.Face3(5, 3, 1),

    new THREE.Face3(3, 5, 7),
    new THREE.Face3(6, 4, 2),

    // Back
    new THREE.Face3(2, 3, 6),
    new THREE.Face3(7, 6, 3)
  );

  var windowBase = new THREE.Mesh(windowGeometry, glassMaterial);

  windowBase.position.x = 160;
  windowBase.position.z = -22;

  body.add(windowBase);

  // Body details
  var bodyDetailsGeometry = new THREE.Geometry();

  bodyDetailsGeometry.vertices.push(
    // Front
    new THREE.Vector3(60, -12, -2),
    new THREE.Vector3(60, 12, -2),
    // Front
    new THREE.Vector3(53, -8, -10),
    new THREE.Vector3(55, 10, -10),

    // Top Side
    new THREE.Vector3(238, -20, -14),
    new THREE.Vector3(238, 20, -14),

    // End
    new THREE.Vector3(230, -25.1, -5),
    new THREE.Vector3(230, 25.1, -5)
  );

  bodyDetailsGeometry.faces.push(
    new THREE.Face3(0, 4, 6),
    new THREE.Face3(0, 2, 4),

    new THREE.Face3(7, 5, 1),
    new THREE.Face3(5, 3, 1)
  );

  var bodyDetails = new THREE.Mesh(bodyDetailsGeometry, accentMaterial);

  body.add(bodyDetails);

  return body;
}

function createWing(flip) {
  var wing = new THREE.Group();

  // Wing
  var wingGeometry = new THREE.Geometry();

  wingGeometry.vertices.push(
    // Top
    new THREE.Vector3(0, -100, 0),
    new THREE.Vector3(27, -100, 0),
    new THREE.Vector3(27, 0, 0),

    new THREE.Vector3(27, 0, 0),
    new THREE.Vector3(77, -100, 0),

    new THREE.Vector3(77, 0, 0),

    // Bottom
    new THREE.Vector3(0, -100, -5),
    new THREE.Vector3(27, -100, -5),
    new THREE.Vector3(27, 0, -5),

    new THREE.Vector3(27, 0, -5),
    new THREE.Vector3(77, -100, -5),

    new THREE.Vector3(77, 0, -5),

    // Wing outer detail
    new THREE.Vector3(40, 1.5, -2),
    new THREE.Vector3(65, 1.5, -2),

    new THREE.Vector3(40, 1.5, -4),
    new THREE.Vector3(65, 1.5, -4),

    new THREE.Vector3(40, 0, -2),
    new THREE.Vector3(65, 0, -2),

    new THREE.Vector3(40, 0, -4),
    new THREE.Vector3(65, 0, -4)
  );

  wingGeometry.faces.push(
    // Top
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(1, 4, 3),
    new THREE.Face3(2, 4, 5),

    // Bottom
    new THREE.Face3(8, 7, 6),
    new THREE.Face3(9, 10, 7),
    new THREE.Face3(11, 10, 8),

    // Side right
    new THREE.Face3(10, 11, 4),
    new THREE.Face3(4, 11, 5),

    // Side top
    new THREE.Face3(11, 3, 5),
    new THREE.Face3(9, 3, 11),

    // Side bottom
    new THREE.Face3(0, 6, 4),
    new THREE.Face3(6, 10, 4),

    // Side left
    new THREE.Face3(0, 2, 6),
    new THREE.Face3(2, 8, 6),

    // Wing outer detail
    new THREE.Face3(12, 13, 14),
    new THREE.Face3(14, 13, 15),
    new THREE.Face3(12, 16, 17),
    new THREE.Face3(13, 12, 17),
    new THREE.Face3(18, 14, 19),
    new THREE.Face3(14, 15, 19),
    new THREE.Face3(12, 14, 16),
    new THREE.Face3(18, 16, 14),
    new THREE.Face3(17, 15, 13),
    new THREE.Face3(15, 17, 19)
  );

  wingGeometry.computeFaceNormals();

  var wingBase = new THREE.Mesh(wingGeometry, baseMaterial);

  wing.add(wingBase);

  // Wing details top
  var wingDetailsTopGeometry = new THREE.Geometry();

  wingDetailsTopGeometry.vertices.push(
    // Large
    new THREE.Vector3(45, -22, 0),
    new THREE.Vector3(45, -45, 0),
    new THREE.Vector3(77, -45, 0),
    new THREE.Vector3(77, -22, 0),
    new THREE.Vector3(34, -63, 0),
    new THREE.Vector3(45, -63, 0),

    // Small 1
    new THREE.Vector3(19, -31, 0),
    new THREE.Vector3(39, -31, 0),
    new THREE.Vector3(38, -35, 0),
    new THREE.Vector3(17.7, -35, 0),

    // Small 2
    new THREE.Vector3(17, -38, 0),
    new THREE.Vector3(37, -38, 0),
    new THREE.Vector3(36, -42, 0),
    new THREE.Vector3(15.7, -42, 0),

    // Small 3
    new THREE.Vector3(15, -45, 0),
    new THREE.Vector3(35, -45, 0),
    new THREE.Vector3(34, -49, 0),
    new THREE.Vector3(13.7, -49, 0),

    // Small 4
    new THREE.Vector3(13, -52, 0),
    new THREE.Vector3(33, -52, 0),
    new THREE.Vector3(32, -56, 0),
    new THREE.Vector3(11.7, -56, 0),

    // Small 5
    new THREE.Vector3(11, -59, 0),
    new THREE.Vector3(31, -59, 0),
    new THREE.Vector3(30, -63, 0),
    new THREE.Vector3(9.7, -63, 0)
  );

  wingDetailsTopGeometry.faces.push(
    // Large
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),
    new THREE.Face3(0, 4, 5),

    new THREE.Face3(2, 1, 0),
    new THREE.Face3(3, 2, 0),
    new THREE.Face3(5, 4, 0),

    // Small 1
    new THREE.Face3(8, 7, 6),
    new THREE.Face3(8, 6, 9),
    new THREE.Face3(6, 7, 8),
    new THREE.Face3(9, 6, 8),

    // Small 2
    new THREE.Face3(12, 11, 10),
    new THREE.Face3(12, 10, 13),
    new THREE.Face3(10, 11, 12),
    new THREE.Face3(13, 10, 12),

    // Small 3
    new THREE.Face3(16, 15, 14),
    new THREE.Face3(16, 14, 17),
    new THREE.Face3(14, 15, 16),
    new THREE.Face3(17, 14, 16),

    // Small 4
    new THREE.Face3(20, 19, 18),
    new THREE.Face3(20, 18, 21),
    new THREE.Face3(18, 19, 20),
    new THREE.Face3(21, 18, 20),

    // Small 5
    new THREE.Face3(24, 23, 22),
    new THREE.Face3(24, 22, 25),
    new THREE.Face3(22, 23, 24),
    new THREE.Face3(25, 22, 24)
  );

  wingDetailsTopGeometry.computeFaceNormals();

  var wingDetailsTop = new THREE.Mesh(wingDetailsTopGeometry, accentMaterial);

  wingDetailsTop.position.z = flip ? -5.3 : 0.3;

  wing.add(wingDetailsTop);

  // Wing details bottom
  var wingDetailsBottomGeometry = new THREE.Geometry();

  wingDetailsBottomGeometry.vertices.push(
    // Large
    new THREE.Vector3(25, -50, -5),
    new THREE.Vector3(65, -50, -5),
    new THREE.Vector3(65, -65, -5),
    new THREE.Vector3(20, -65, -5),

    new THREE.Vector3(38, -43, -5),
    new THREE.Vector3(65, -43, -5),
    new THREE.Vector3(65, -50, -5),
    new THREE.Vector3(35, -50, -5),

    // Small
    new THREE.Vector3(45, -20, -5),
    new THREE.Vector3(65, -20, -5),
    new THREE.Vector3(65, -34, -5),
    new THREE.Vector3(40, -34, -5)
  );

  wingDetailsBottomGeometry.faces.push(
    // Large
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),

    new THREE.Face3(2, 1, 0),
    new THREE.Face3(3, 2, 0),

    new THREE.Face3(4, 5, 6),
    new THREE.Face3(4, 6, 7),

    new THREE.Face3(6, 5, 4),
    new THREE.Face3(7, 6, 4),

    // Small
    new THREE.Face3(8, 9, 10),
    new THREE.Face3(8, 10, 11),

    new THREE.Face3(10, 9, 8),
    new THREE.Face3(11, 10, 8)
  );

  wingDetailsBottomGeometry.computeFaceNormals();

  var wingDetailsBottom = new THREE.Mesh(wingDetailsBottomGeometry, darkMaterial);

  wingDetailsBottom.position.z = flip ? 5.3 : -0.3;

  wing.add(wingDetailsBottom);

  // Laser
  var laserBase = new THREE.Group();

  var laser1Geometry = new THREE.CylinderGeometry(6.5, 6.5, 2, 16);
  var laser1 = new THREE.Mesh(laser1Geometry, baseMaterial);

  laserBase.add(laser1);

  var laser2Geometry = new THREE.CylinderGeometry(5.5, 6.5, 1, 16);
  var laser2 = new THREE.Mesh(laser2Geometry, baseMaterial);

  laser2.position.y = 1;
  laserBase.add(laser2);

  var laser3Geometry = new THREE.CylinderGeometry(3.5, 3.5, 2, 16);
  var laser3 = new THREE.Mesh(laser3Geometry, baseMaterial);

  laser3.position.y = 3;
  laserBase.add(laser3);

  var laser4Geometry = new THREE.CylinderGeometry(6.5, 4.5, 2, 16);
  var laser4 = new THREE.Mesh(laser4Geometry, baseMaterial);

  laser4.position.y = 5.5;
  laserBase.add(laser4);

  var laser5Geometry = new THREE.CylinderGeometry(6.5, 6.5, 51, 16);
  var laser5 = new THREE.Mesh(laser5Geometry, baseMaterial);

  laser5.position.y = 32;
  laserBase.add(laser5);

  var laser6Geometry = new THREE.CylinderGeometry(6, 6, 10, 16);
  var laser6 = new THREE.Mesh(laser6Geometry, baseMaterial);

  laser6.position.y = 62;
  laserBase.add(laser6);

  var laser7Geometry = new THREE.CylinderGeometry(6.5, 6, 1, 16);
  var laser7 = new THREE.Mesh(laser7Geometry, baseMaterial);

  laser7.position.y = 67;
  laserBase.add(laser7);

  var laser8Geometry = new THREE.CylinderGeometry(7, 6.5, 4, 16);
  var laser8 = new THREE.Mesh(laser8Geometry, baseMaterial);

  laser8.position.y = 68;
  laserBase.add(laser8);

  var laser9Geometry = new THREE.CylinderGeometry(7.5, 7.5, 7, 16);
  var laser9 = new THREE.Mesh(laser9Geometry, baseMaterial);

  laser9.position.y = 73;
  laserBase.add(laser9);

  var laser10Geometry = new THREE.CylinderGeometry(6, 7.5, 2, 16);
  var laser10 = new THREE.Mesh(laser10Geometry, baseMaterial);

  laser10.position.y = 77.5;
  laserBase.add(laser10);

  var laser11Geometry = new THREE.CylinderGeometry(3.5, 3.5, 56, 16);
  var laser11 = new THREE.Mesh(laser11Geometry, baseMaterial);

  laser11.position.y = 106.5;
  laserBase.add(laser11);

  var laser12Geometry = new THREE.CylinderGeometry(2.5, 2.5, 48, 16);
  var laser12 = new THREE.Mesh(laser12Geometry, baseMaterial);

  laser12.position.y = 158.5;
  laserBase.add(laser12);

  var laser13Geometry = new THREE.CylinderGeometry(5.5, 3.5, 2, 16);
  var laser13 = new THREE.Mesh(laser13Geometry, baseMaterial);

  laser13.position.y = 183.5;
  laserBase.add(laser13);

  var laser14Geometry = new THREE.CylinderGeometry(4, 5.5, 5, 16);
  var laser14 = new THREE.Mesh(laser14Geometry, baseMaterial);

  laser14.position.y = 187;
  laserBase.add(laser14);

  var laser15Geometry = new THREE.CylinderGeometry(1.5, 1.5, 25, 16);
  var laser15 = new THREE.Mesh(laser15Geometry, baseMaterial);

  laser15.position.y = 202;
  laserBase.add(laser15);

  var laser16Geometry = new THREE.CylinderGeometry(10, 10, 5, 16, 1, true, 0, Math.PI);
  var laser16 = new THREE.Mesh(laser16Geometry, baseMaterial);

  laser16.position.y = 200;
  laser16.rotation.z = -Math.PI / 2;

  laserBase.add(laser16);

  var laser17Geometry = new THREE.CylinderGeometry(9, 9, 5, 16, 1, true, 0, Math.PI);

  laser17Geometry.faces = laser17Geometry.faces.map(function (face) {
    return new THREE.Face3(face.c, face.b, face.a);
  });

  var laser17 = new THREE.Mesh(laser17Geometry, baseMaterial);

  laser17.position.y = 202;
  laser17.rotation.z = -Math.PI / 2;

  laserBase.add(laser17);

  // Laser mount detail
  var laserMountGeometry = new THREE.Geometry();

  laserMountGeometry.vertices.push(
    // Top
    new THREE.Vector3(38, 0, 0),
    new THREE.Vector3(57, 0, 0),
    new THREE.Vector3(76, 0, 0),

    new THREE.Vector3(42, 10, 0),
    new THREE.Vector3(72, 10, 0),

    // Bottom
    new THREE.Vector3(38, 0, 2.5),
    new THREE.Vector3(57, 0, 2.5),
    new THREE.Vector3(76, 0, 2.5),

    new THREE.Vector3(42, 10, 2.5),
    new THREE.Vector3(72, 10, 2.5)
  );

  laserMountGeometry.faces.push(
    // Top
    new THREE.Face3(3, 2, 0),
    new THREE.Face3(4, 2, 0),
    new THREE.Face3(1, 3, 4),

    // Bottom
    new THREE.Face3(5, 7, 8),
    new THREE.Face3(5, 7, 9),
    new THREE.Face3(9, 8, 5),

    // Side top
    new THREE.Face3(0, 2, 5),
    new THREE.Face3(7, 5, 2),

    // Side left
    new THREE.Face3(5, 3, 0),
    new THREE.Face3(3, 5, 8),

    // Side right
    new THREE.Face3(2, 4, 7),
    new THREE.Face3(9, 7, 4),

    // Side bottom
    new THREE.Face3(8, 4, 3),
    new THREE.Face3(4, 8, 9)
  );

  laserMountGeometry.computeFaceNormals();

  var laserMountBase = new THREE.Mesh(laserMountGeometry, baseMaterial);

  laserMountBase.position.x = 108;
  laserMountBase.position.z = flip ? -7 : 0;
  laserMountBase.rotation.z = Math.PI;

  wing.add(laserMountBase);

  // Engine mount
  var engineMountGeometry = new THREE.Geometry();

  engineMountGeometry.vertices.push(
    // Small
    // Top
    new THREE.Vector3(19, 0, 0),
    new THREE.Vector3(35, 0, 0),
    new THREE.Vector3(58, 0, 0),

    new THREE.Vector3(22, 11, 0),
    new THREE.Vector3(55, 11, 0),

    // Bottom
    new THREE.Vector3(19, 0, 6),
    new THREE.Vector3(35, 0, 6),
    new THREE.Vector3(58, 0, 6),

    new THREE.Vector3(22, 11, 6),
    new THREE.Vector3(55, 11, 6),

    // Large
    // Top
    new THREE.Vector3(5, -19, 0),
    new THREE.Vector3(35, -19, 0),
    new THREE.Vector3(71, -19, 0),

    new THREE.Vector3(5, 0, 0),
    new THREE.Vector3(71, 0, 0),

    // Bottom
    new THREE.Vector3(5, -19, 15),
    new THREE.Vector3(35, -19, 15),
    new THREE.Vector3(71, -19, 15),

    new THREE.Vector3(5, 0, 10),
    new THREE.Vector3(71, 0, 10),

    // End
    new THREE.Vector3(5, -36, 0),
    new THREE.Vector3(71, -36, 0),

    new THREE.Vector3(5, -36, 15),
    new THREE.Vector3(71, -36, 15),

    // Wing connector
    new THREE.Vector3(5, -36, 2),
    new THREE.Vector3(71, -36, 2),
    new THREE.Vector3(5, -46, 2),
    new THREE.Vector3(71, -46, 2),

    new THREE.Vector3(5, -36, 5),
    new THREE.Vector3(71, -36, 5),
    new THREE.Vector3(5, -46, 5),
    new THREE.Vector3(71, -46, 5)
  );

  engineMountGeometry.faces.push(
    // Small
    // Top
    new THREE.Face3(3, 2, 0),
    new THREE.Face3(4, 2, 0),
    new THREE.Face3(1, 3, 4),

    // Bottom
    new THREE.Face3(5, 7, 8),
    new THREE.Face3(5, 7, 9),
    new THREE.Face3(9, 8, 5),

    // Side top
    new THREE.Face3(0, 2, 5),
    new THREE.Face3(7, 5, 2),

    // Side left
    new THREE.Face3(5, 3, 0),
    new THREE.Face3(3, 5, 8),

    // Side right
    new THREE.Face3(2, 4, 7),
    new THREE.Face3(9, 7, 4),

    // Side bottom
    new THREE.Face3(8, 4, 3),
    new THREE.Face3(4, 8, 9),

    // Large
    // Top
    new THREE.Face3(13, 12, 10),
    new THREE.Face3(14, 12, 10),
    new THREE.Face3(11, 13, 14),

    // Bottom
    new THREE.Face3(15, 17, 18),
    new THREE.Face3(15, 17, 19),
    new THREE.Face3(19, 18, 15),

    // Side top
    new THREE.Face3(10, 12, 15),
    new THREE.Face3(17, 15, 12),

    // Side left
    new THREE.Face3(15, 13, 10),
    new THREE.Face3(13, 15, 18),

    // Side right
    new THREE.Face3(12, 14, 17),
    new THREE.Face3(19, 17, 14),

    // Side bottom
    new THREE.Face3(18, 14, 13),
    new THREE.Face3(14, 18, 19),

    // End
    new THREE.Face3(15, 22, 23),
    new THREE.Face3(23, 17, 15),

    new THREE.Face3(21, 20, 10),
    new THREE.Face3(10, 12, 21),

    new THREE.Face3(20, 15, 10),
    new THREE.Face3(15, 20, 22),

    new THREE.Face3(12, 17, 21),
    new THREE.Face3(23, 21, 17),

    new THREE.Face3(20, 21, 22),
    new THREE.Face3(23, 22, 21),

    // Wing connector
    new THREE.Face3(24, 26, 28),
    new THREE.Face3(30, 28, 26),

    new THREE.Face3(29, 27, 25),
    new THREE.Face3(27, 29, 31),

    new THREE.Face3(24, 25, 26),
    new THREE.Face3(27, 26, 25),

    new THREE.Face3(30, 29, 28),
    new THREE.Face3(29, 30, 31)
  );

  engineMountGeometry.computeFaceNormals();

  var engineMountBase = new THREE.Mesh(engineMountGeometry, baseMaterial);

  engineMountBase.position.x = flip ? 82 : 6;
  engineMountBase.position.y = -81;
  engineMountBase.position.z = flip ? 0 : -5;

  engineMountBase.rotation.y = flip ? Math.PI : 0;

  wing.add(engineMountBase);

  var tubeGeometry = new THREE.CylinderGeometry(13, 13, 62, 16);
  var tube = new THREE.Mesh(tubeGeometry, baseMaterial);

  tube.position.x = 50;
  tube.position.y = -103;
  tube.position.z = flip ? -15 : 10;
  tube.rotation.z = Math.PI / 2;

  wing.add(tube);

  var tube2Geometry = new THREE.CylinderGeometry(6, 6, 46, 16);
  var tube2 = new THREE.Mesh(tube2Geometry, baseMaterial);

  tube2.position.x = 0;
  tube2.position.y = -104;
  tube2.position.z = flip ? -15 : 10;
  tube2.rotation.z = Math.PI / 2;

  wing.add(tube2);

  var tube3Geometry = new THREE.CylinderGeometry(9, 9, 46, 16);
  var tube3 = new THREE.Mesh(tube3Geometry, baseMaterial);

  tube3.position.x = -8;
  tube3.position.y = -104;
  tube3.position.z = flip ? -15 : 10;
  tube3.rotation.z = Math.PI / 2;

  wing.add(tube3);

  var tube4Geometry = new THREE.CylinderGeometry(12, 9, 8, 16);
  var tube4 = new THREE.Mesh(tube4Geometry, baseMaterial);

  tube4.position.x = -35;
  tube4.position.y = -104;
  tube4.position.z = flip ? -15 : 10;
  tube4.rotation.z = Math.PI / 2;

  wing.add(tube4);

  var tube5Geometry = new THREE.CylinderGeometry(10, 12, 18, 16);
  var tube5 = new THREE.Mesh(tube5Geometry, baseMaterial);

  tube5.position.x = -48;
  tube5.position.y = -104;
  tube5.position.z = flip ? -15 : 10;
  tube5.rotation.z = Math.PI / 2;

  wing.add(tube5);

  var tube6Geometry = new THREE.CylinderGeometry(8, 8, 1, 16);
  var tube6 = new THREE.Mesh(tube6Geometry, fireMaterial);

  tube6.position.x = -56.6;
  tube6.position.y = -104;
  tube6.position.z = flip ? -15 : 10;
  tube6.rotation.z = Math.PI / 2;

  wing.add(tube6);

  return wing;
};

function createStar() {
  var starGeometry = new THREE.CylinderGeometry(3, 3, 6);
  var star = new THREE.Mesh(starGeometry, starMaterial);

  star.position.x = -20 + Math.random() * 40;
  star.position.y = -20 + Math.random() * 40;
  star.position.z = -farPlane * .9;

  star.rotation.x = Math.PI / 2;

  star.move = {};

  star.move.x = -75 + Math.random() * 150;
  star.move.y = -75 + Math.random() * 150;
  star.move.z = Math.abs(200 - Math.abs(star.move.x) - Math.abs(star.move.y));

  star.position._x = star.position.x;
  star.position._y = star.position.y;
  star.position._z = star.position.z;

  scene.add(star);

  return star;
}

function updateStarCloud() {
  var starsToAdd = Math.min(3, maxStars - stars.length);

  for (var i = 0; i < starsToAdd; i++) {
    stars.push(createStar());
  }

  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];

    star.position.y += star.move.x;
    star.position.x += star.move.y;
    star.position.z += star.move.z;

    if (star.position.z > radius) {
      star.position.x = star.position._x;
      star.position.y = star.position._y;
      star.position.z = star.position._z;
    }
  }
}

function updateCameraPosition(mouseX, mouseY) {
  var thetaX = (-(mouseX - screenCenter.x)) / screenCenter.x;
  var thetaY = (-(mouseY - screenCenter.y)) / screenCenter.y;

  var x = radius * Math.sin(thetaX);
  var y = radius * Math.sin(thetaY);
  var z = radius - radius * .25 * Math.sin(thetaY);

  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;

  camera.lookAt(new THREE.Vector3(0, 0, 0));
};

init();

createLights();
createXWing(0, 0, 0, 0x900000);
createXWing(400, 100, 400, 0x909000);
createXWing(-400, 100, 400, 0x009090);

function render() {
  updateStarCloud();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

updateCameraPosition(screenCenter.x * 1.5, screenCenter.y / 3);
requestAnimationFrame(render);

document.onmousemove = function (event) {
  updateCameraPosition(event.clientX, event.clientY);
};