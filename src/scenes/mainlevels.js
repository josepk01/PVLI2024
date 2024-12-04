import gameData from '../gameData.js';

export class MainLevels extends Phaser.Scene {
    constructor() {
        super('mainlevels');
        this.scrollOffset = 0; // Desplazamiento para el scroll
    }

    preload() {
        // Cargar el JSON de objetos de la tienda desde la ruta correcta
        this.load.json('items', 'src/entities/objetostienda/items.json');
    }

    create() {
        // Obtener los datos del JSON cargado
        const data = this.cache.json.get('items');
        if (!data) {
            console.error("No se pudo cargar el archivo JSON de items.");
            return;
        }
        this.itemsData = data.items;

        // Cargar los datos del jugador desde localStorage (dinero y objetos comprados)
        this.loadPlayerData();

        // Aplicar los efectos de los objetos comprados previamente al cargar la partida
        this.applyAllPurchasedItemEffects();

        this.setupUI();
        this.scale.on('resize', this.setupUI, this);
    }

    loadPlayerData() {
        // Cargar dinero del jugador desde localStorage si existe
        const storedMoney = localStorage.getItem('playerMoney');
        gameData.playerMoney = storedMoney ? parseInt(storedMoney, 10) : 500; // Valor por defecto de 500
        this.playerMoney = gameData.playerMoney;
        // Cargar los objetos comprados desde localStorage si existen
        const storedItems = localStorage.getItem('purchasedItems');
        gameData.purchasedItems = storedItems ? JSON.parse(storedItems) : [];
    }

    savePlayerData() {
        // Guardar el dinero del jugador en localStorage
        localStorage.setItem('playerMoney', gameData.playerMoney);

        // Guardar los objetos comprados en localStorage
        localStorage.setItem('purchasedItems', JSON.stringify(gameData.purchasedItems));
    }

    setupUI() {
        // Inicializar currentLevel si aún no está definido
        if (!this.currentLevel) {
            this.currentLevel = 'level1'; // Valor por defecto
        }
    
        // Limpiar todos los elementos previos excepto los elementos clave
        this.children.list
            .filter(child => child !== this.rankingLevelText && child !== this.moneyText && child !== this.itemDescriptionText)
            .forEach(child => child.destroy());
    
        // Obtener dimensiones actuales de la pantalla
        const { width, height } = this.sys.game.scale.gameSize;
    
        // Crear fondo para cada sección con posiciones y tamaños relativos
        const levelSelectionRect = this.add.rectangle(width * 0.25, height * 0.5, width * 0.5, height, 0x444444).setOrigin(0.5);
        const rankingRect = this.add.rectangle(width * 0.75, height * 0.25, width * 0.5, height * 0.5, 0x333333).setOrigin(0.5);

        // Cambiar el fondo gris de la tienda por una imagen
        this.storeBackground = this.add.image(width * 0.5, height * 0.5, 'chests').setDisplaySize(width * 0.5, height * 0.5).setOrigin(0.5);
    
        // Título del mapa de niveles
        this.add.text(width * 0.25, height * 0.1, 'Mapa de Niveles', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    
        // Crear iconos de nivel y manejar eventos para mostrar puntuaciones
        const levelIcons = [
            { x: width * 0.2, y: height * 0.4, level: 'level1', texture: 'abyss_necklace' },
            { x: width * 0.25, y: height * 0.5, level: 'level2', texture: 'abyss_necklace' },
            { x: width * 0.3, y: height * 0.6, level: 'level3', texture: 'abyss_necklace' }
        ];
    
        levelIcons.forEach(({ x, y, level, texture }) => {
            const icon = this.add.image(x, y, texture).setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.scene.start(level))
                .on('pointerover', () => this.handleLevelHover(level));
    
            // Título de cada nivel
            this.add.text(x, y - 40, `Nivel ${level.charAt(level.length - 1)}`, { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        });
    
        // Título de la sección de ranking
        this.add.text(width * 0.75, height * 0.05, 'Ranking', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    
        // Crear o actualizar el texto del nivel actualmente mostrado en el ranking
        if (!this.rankingLevelText) {
            this.rankingLevelText = this.add.text(width * 0.75, height * 0.1, `Nivel ${this.currentLevel.charAt(this.currentLevel.length - 1)}`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);
        } else {
            this.rankingLevelText.setPosition(width * 0.75, height * 0.1);
            this.rankingLevelText.setText(`Nivel ${this.currentLevel.charAt(this.currentLevel.length - 1)}`);
        }
    
        // Mostrar el ranking del nivel seleccionado actualmente
        this.displayRanking(this.currentLevel);
    
        // Título de la tienda
        this.add.text(width * 0.75, height * 0.55, 'Tienda', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    
        // Crear o reutilizar el texto del dinero del jugador
        if (!this.moneyText) {
            this.moneyText = this.add.text(width * 0.55, height * 0.6, `Dinero: ${gameData.playerMoney} €`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0, 0.5);
        } else {
            this.moneyText.setPosition(width * 0.55, height * 0.6);
            this.moneyText = this.add.text(width * 0.55, height * 0.6, `Dinero: ${this.playerMoney} €`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0, 0.5);
        }
    
        // Crear texto para la descripción del objeto seleccionado
        if (!this.itemDescriptionText) {
            this.itemDescriptionText = this.add.text(width * 0.55, height * 0.65, '', { fontSize: '20px', fill: '#FFF' }).setOrigin(0, 0.5);
        }
    
        // Crear un contenedor para los objetos de la tienda
        this.storeContainer = this.add.container(width * 0.75, height * 0.75);
    
        // Crear los elementos de la tienda
        this.displayStoreItems();
    
        // Crear botones de scroll
        const scrollUpButton = this.add.text(width * 0.95, height * 0.55, '▲', { fontSize: '32px', fill: '#FFF' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scrollStore(-1));
    
        const scrollDownButton = this.add.text(width * 0.95, height * 0.95, '▼', { fontSize: '32px', fill: '#FFF' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scrollStore(1));
    }
    
    displayStoreItems() {
        this.storeContainer.removeAll(); // Eliminar elementos anteriores
        const itemsPerRow = 3; // Número de objetos por fila
        const itemSize = 60; // Tamaño del área de cada objeto (para separación)
        const startX = -itemSize; // Posición inicial en X
        const startY = -100 + this.scrollOffset; // Posición inicial en Y, incluyendo el offset de scroll
    
        this.itemsData.forEach((item, index) => {
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
    
            // Posición de cada objeto en la tienda
            const x = startX + col * itemSize * 2;
            const y = startY + row * itemSize * 2;
    
            // Comprobar si el objeto ya ha sido comprado
            const isPurchased = gameData.purchasedItems.some(purchasedItem => purchasedItem.type === item.type);
    
            // Crear imagen del objeto
            const itemImage = this.add.image(x, y, item.texture)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
    
            // Aplicar escala y filtro en función de si el objeto ha sido comprado
            if (isPurchased) {
                itemImage.setScale(1.5);
            } else {
                itemImage.setScale(1.2); // 20% más pequeño
                itemImage.setTint(0x808080); // Aplicar filtro gris para simular escala de grises
            }
    
            // Manejar evento del ratón sobre el objeto
            itemImage.on('pointerover', () => {
                if (!isPurchased) {
                    itemImage.setScale(1.5); // Escalar al tamaño normal cuando el ratón esté encima
                }
                this.itemDescriptionText.setText(item.description || 'Sin descripción');
            });
    
            // Manejar evento cuando el ratón sale del objeto
            itemImage.on('pointerout', () => {
                if (!isPurchased) {
                    itemImage.setScale(1.2); // Volver a ser más pequeño si no ha sido comprado
                }
                this.itemDescriptionText.setText(''); // Limpiar la descripción
            });
    
            // Manejar la compra solo si el objeto no ha sido comprado
            if (!isPurchased) {
                itemImage.on('pointerdown', () => this.purchaseItem(item));
            }
    
            // Crear el texto del precio debajo de la imagen
            const priceText = this.add.text(x, y + 20, `${item.cost} €`, { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
    
            // Añadir imagen y precio al contenedor de la tienda
            this.storeContainer.add([itemImage, priceText]);
        });
    }
    
        
    
    handleLevelHover(level) {
        if (this.currentLevel !== level) {
            this.currentLevel = level; // Actualizar el nivel actual mostrado
            this.displayRanking(level); // Mostrar el ranking correspondiente al nivel
        }
    }
    
    displayRanking(level) {
        // Limpiar ranking previo (incluyendo el título del nivel)
        this.children.list.filter(child => child.isRankingItem).forEach(child => child.destroy());
    
        // Obtener dimensiones actuales de la pantalla para colocar los textos correctamente
        const { width, height } = this.sys.game.scale.gameSize;
    
        // Añadir el título del nivel al ranking
        const levelNumber = level.charAt(level.length - 1);
        const rankTitle = this.add.text(width * 0.75, height * 0.1, `Nivel ${levelNumber}`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);
        rankTitle.isRankingItem = true;  // Marcar como parte del ranking
    
        // Cargar las mejores puntuaciones del nivel especificado y mostrarlas
        let highScores = JSON.parse(localStorage.getItem(`highScores_${level}`)) || [];
        for (let i = 0; i < 5; i++) {
            const scoreText = highScores[i] !== undefined ? `HighScores ${i + 1}: ${highScores[i]}` : '------------';
            const scoreDisplay = this.add.text(width * 0.75, height * 0.15 + i * 30, scoreText, { fontSize: '20px', fill: '#FFF' }).setOrigin(0.5);
            scoreDisplay.isRankingItem = true;  // Marcar como parte del ranking
        }
    }
    
    // displayStoreItems() {
    //     this.storeContainer.removeAll(); // Eliminar elementos anteriores
    //     const itemsPerRow = 3; // Número de objetos por fila
    //     const itemSize = 60; // Tamaño del área de cada objeto (para separación)
    //     const startX = -itemSize; // Posición inicial en X
    //     const startY = -100 + this.scrollOffset; // Posición inicial en Y, incluyendo el offset de scroll

    //     this.itemsData.forEach((item, index) => {
    //         const row = Math.floor(index / itemsPerRow);
    //         const col = index % itemsPerRow;

    //         // Posición de cada objeto en la tienda
    //         const x = startX + col * itemSize * 2;
    //         const y = startY + row * itemSize * 2;

    //         // Comprobar si el objeto ya ha sido comprado
    //         const isPurchased = gameData.purchasedItems.some(purchasedItem => purchasedItem.type === item.type);

    //         // Crear imagen del objeto
    //         const itemImage = this.add.image(x, y, item.texture)
    //             .setOrigin(0.5)
    //             .setInteractive({ useHandCursor: true });

    //         // Aplicar escala y filtro en función de si el objeto ha sido comprado
    //         if (isPurchased) {
    //             itemImage.setScale(1.5);
    //         } else {
    //             itemImage.setScale(1.2); // 20% más pequeño si no está comprado
    //             itemImage.setTint(0x808080); // Aplicar filtro gris para simular escala de grises
    //         }

    //         // Manejar evento del ratón sobre el objeto
    //         itemImage.on('pointerover', () => {
    //             if (!isPurchased) {
    //                 itemImage.setScale(1.8); // Aumentar un 20% sobre el tamaño normal
    //             }
    //             this.itemDescriptionText.setText(`Efectos: Salud +${item.health}, Daño +${item.damage}`); // Mostrar descripción
    //         });

    //         // Manejar evento cuando el ratón sale del objeto
    //         itemImage.on('pointerout', () => {
    //             if (!isPurchased) {
    //                 itemImage.setScale(1.2); // Volver a ser más pequeño si no ha sido comprado
    //             }
    //             this.itemDescriptionText.setText(''); // Limpiar descripción
    //         });

    //         // Manejar la compra solo si el objeto no ha sido comprado
    //         if (!isPurchased) {
    //             itemImage.on('pointerdown', () => this.purchaseItem(item));
    //         }

    //         // Crear el texto del precio debajo de la imagen
    //         const priceText = this.add.text(x, y + 20, `${item.cost} €`, { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);

    //         // Añadir imagen y precio al contenedor de la tienda
    //         this.storeContainer.add([itemImage, priceText]);
    //     });
    // }



    scrollStore(direction) {
        // Ajustar el desplazamiento de la tienda con un límite para que no se pueda ir demasiado arriba o abajo
        this.scrollOffset += direction * 100; // Ajuste del valor de desplazamiento
        const maxScroll = Math.max(0, (Math.ceil(this.itemsData.length / 3) - 3) * 120); // Límite del desplazamiento

        if (this.scrollOffset < 0) {
            this.scrollOffset = 0; // Limitar el desplazamiento hacia arriba
        }
        if (this.scrollOffset > maxScroll) {
            this.scrollOffset = maxScroll; // Limitar el desplazamiento hacia abajo
        }

        // Actualizar los elementos de la tienda con el nuevo desplazamiento
        this.displayStoreItems();
    }

    purchaseItem(item) {
        // Verificar si el jugador tiene suficiente dinero
        if (gameData.playerMoney >= item.cost) {
            gameData.playerMoney -= item.cost; // Restar el coste del dinero del jugador
            item.effectApplied = true; // Marcar que el efecto del objeto se aplicó
            gameData.purchasedItems.push(item); // Añadir el objeto a los comprados
            this.moneyText.setText(`Dinero: ${gameData.playerMoney} €`); // Actualizar el texto del dinero
            this.playerMoney = gameData.playerMoney;
            // Aplicar efectos del objeto comprado al jugador
            this.applyItemEffects(item);

            // Guardar los datos actualizados del jugador en localStorage
            this.savePlayerData();

            console.log(`Compraste: ${item.type}`);
        } else {
            console.log('No tienes suficiente dinero para comprar este objeto.');
        }
    }

    applyAllPurchasedItemEffects() {
        // Aplicar los efectos de todos los objetos comprados previamente si no han sido aplicados ya
        console.log('Aplicando efectos de objetos comprados previamente...');
        gameData.purchasedItems.forEach(item => {
            if (!item.effectApplied) {
                this.applyItemEffects(item);
                item.effectApplied = true;
                console.log(`Aplicado efecto del objeto: ${item.type}`);
            }
        });

        // Guardar los datos actualizados
        this.savePlayerData();
    }

    applyItemEffects(item) {
        // Aplicar efectos según el tipo de objeto
        if (item.health) {
            gameData.playerStats.health += item.health;
            console.log(`Aumentando salud en: ${item.health}`);
        }
        if (item.damage) {
            gameData.playerStats.damage += item.damage;
            console.log(`Aumentando daño en: ${item.damage}`);
        }
        if (item.unlockAttacks) {
            Object.keys(item.unlockAttacks).forEach(attack => {
                if (item.unlockAttacks[attack]) {
                    gameData.playerStats.unlockAttacks[attack] = true;
                    console.log(`Desbloqueando ataque: ${attack}`);
                }
            });
        }
    }
}
