class NPC {
  constructor(type, position, dialogTree, animation) {
    this.type = type;
    this.position = position;
    this.dialogTree = dialogTree;
    this.animation = animation;
    this.reputation = 0;
    this.mesh = null;
  }

  loadModel(loader, scene) {
    loader.load(`assets/models/npcs/${this.type}.glb`, (gltf) => {
      this.mesh = gltf.scene;
      this.mesh.position.copy(this.position);
      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;
      scene.add(this.mesh);

      // Анимация
      if (this.animation) {
        const mixer = new THREE.AnimationMixer(this.mesh);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
        this.mixer = mixer;
      }
    });
  }

  greet(player) {
    const node = this.dialogTree.find(n => n.condition(player, this));
    if (node) {
      return node.text;
    }
    return "Здравствуй...";
  }

  reactToAction(action) {
    if (action === 'help') this.reputation += 10;
  }

  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}

// Пример дерева диалогов
const profDialog = [
  {
    condition: (player, npc) => npc.reputation < 20,
    text: "Ты опоздал на урок! Где твоё зелье?"
  },
  {
    condition: (player, npc) => npc.reputation >= 20,
    text: "Отличная работа, молодой волшебник!"
  }
];

const ghostDialog = [
  {
    condition: () => true,
    text: "Я видел, как в 1892 году... (шепчет тайну)"
  }
];

export const createNPCs = (scene) => {
  const loader = new THREE.GLTFLoader();
  const npcs = [
    new NPC('professor', new THREE.Vector3(5, 0, -3), profDialog, true),
    new NPC('student', new THREE.Vector3(2, 0, 0), [{condition: () => true, text: "Хочешь помочь с домашкой?"}], false),
    new NPC('ghost', new THREE.Vector3(-4, 0, 2), ghostDialog, true),
    new NPC('owl', new THREE.Vector3(0, 2, 5), [{condition: () => true, text: "*хлопает крыльями*"}], true),
    new NPC('elf', new THREE.Vector3(-2, 0, -4), [{condition: () => true, text: "Мастер хочет пирожок?"}], false)
  ];

  npcs.forEach(npc => npc.loadModel(loader, scene));

  return npcs;
};
