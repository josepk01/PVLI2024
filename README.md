# PVLI2024
https://josepk01.github.io/PVLI2024/

# Game Design Document: Pixel Paradox
**Desarrollado por**: Bullet Hell  
**Miembros del equipo**: Jose E. Robles Roca

**Trabajo universitario**
## 1. Introducción

### 1.1. Resumen del Juego
- **Género(s)**: Acción, Plataformas, Shooter 2D, Metroidvania  
- **Descripción**: "Pixel Paradox" es un juego de acción y plataformas en 2D con una estética pixelada, basado en combates de disparos. El juego incorpora elementos retro y desafiantes, presentando niveles temáticos y enfrentamientos contra jefes únicos. El jugador debe avanzar a través de diversas áreas, utilizando habilidades y armas para derrotar enemigos y restaurar el equilibrio de un mundo corrompido.

- **Audiencia Objetivo**:  
  - **Perfil**: Jugadores que disfrutan desafíos en plataformas 2D con una estética retro y mecánicas complejas. Inspirado en títulos como "Celeste", "Cuphead" y "Hollow Knight".

## 2. Mecánicas de Juego

### 2.1. Jugabilidad Principal
El jugador, un aventurero atrapado en un mundo pixelado, debe restaurar el equilibrio del sistema derrotando a jefes, avanzando a través de diferentes niveles temáticos y recolectando recursos para obtener habilidades y armas.

### 2.2. Mecánicas Principales
- **Movimiento y salto**: El jugador puede moverse en 2D (izquierda, derecha, arriba) y realizar saltos, con opción a un doble salto.
- **Combate con armas**: Uso de armas de disparo con diferentes habilidades y poderes, similar al estilo de "Cuphead".
- **Disparos en ocho direcciones**: Permite cubrir distintos ángulos de ataque.
- **Parry**: Contrarrestar ataques enemigos y objetos para recargar la barra de superataques.
- **Habilidades especiales**: Activadas con una barra de energía.
- **Objetos de curación**: Disponibles en el entorno del nivel.
- **Recolección de recursos**: El jugador recoge monedas para comprar armas nuevas.
- **Cooperativo local**: Modo cooperativo para dos jugadores, con la opción de revivir al compañero caído. Pantalla dividida o compartida.
- **Niveles temáticos**: Cada nivel está basado en escenarios como casas, bosques o estanterías.
- **Jefes con patrones de ataque únicos**: Cada jefe tiene ataques específicos.
- **Desbloqueo de nuevas áreas**: Nuevas zonas y desafíos a medida que se progresa.
- **Puntuación por desempeño**: Evaluación basada en golpes recibidos, tiempo completado y uso de habilidades especiales.

### 2.3. Objetivos y Metas
- **Objetivo Principal**: Restaurar el equilibrio del mundo pixelado derrotando a los jefes y eliminando los errores del sistema.
- **Metas Secundarias**: Recoger recursos y mejorar las habilidades del personaje.

### 2.4. Ciclo de Juego
El jugador progresa a través de niveles temáticos, enfrenta jefes, desbloquea nuevas áreas y mejora sus habilidades.

## 3. Narrativa

### 3.1. Historia Principal
El jugador está atrapado en un mundo pixelado corrompido por el "Maestro de los Bugs", un ente que ha sembrado errores en el sistema. Cada jefe representa un tipo de bug que el jugador debe eliminar para restaurar el orden.

### 3.2. Personajes
- **Protagonista**: Aventurero atrapado en el mundo pixelado.
- **Protagonista Secundario**: Compañero del protagonista.
- **Jefes**: Cada jefe es la representación de un bug en el sistema.

### 3.3. Mundo y Ambientación
- **Mundo pixelado**: Un universo pixelado y surrealista afectado por glitches y errores.
- **Estilo visual**: Ambientes en 2D con un estilo pixel art moderno.
- **Ambientación**: Escenarios temáticos que reflejan la corrupción del sistema.

## 4. Estilo Gráfico, Lore y Narrativa

### 4.1. Estilo Gráfico
- **Pixel Art**: Estética pixelada con detalles coloridos.
- **Ambientes surrealistas**: Se utilizan capas de paralaje para añadir profundidad a los fondos.
- **Animaciones fluidas**: A pesar de ser pixel art, el juego apuesta por una fluidez moderna.

### 4.2. Lore y Narrativa
El mundo ha sido corrompido por un ente conocido como el "Maestro de los Bugs", que ha introducido errores en el sistema. Los jugadores deben derrotar a los jefes, que representan diferentes tipos de bugs, para restaurar el equilibrio.

## 5. Interfaz de Usuario (UI/UX)

### 5.1. Menús y HUD

- Como se ve en las imágenes, el jugador tendrá arriba las barras de vida y la barra de carga del especial (en caso de ser dos jugadores estará en ambas esquinas).  
  ![HUD del Juego](assets/presentacion/level_2.png)


- En el menú principal del juego tendremos el mapa en el que el jugador podrá avanzar, un listado con las mejores puntuaciones por mapa y justo debajo estará la tienda donde el jugador podrá comprar y equiparse.  
  ![Menú Principal](assets/presentacion/mapa_ranking_tienda.png)


## 6. Juegos Similares o Inspiración

1. **Cuphead**:  
   - Inspiración: Combate basado en patrones de jefes, mecánica de disparo y dificultad progresiva.
2. **Hollow Knight**:  
   - Inspiración: Sistema de combate dinámico y exploración.
3. **Celeste**:  
   - Inspiración: Niveles precisos y desafiantes con un control fluido.
4. **Enter the Gungeon**:  
   - Inspiración: Combate rápido con variedad de armas y jefes variados.
5. **Hyper Light Drifter**:  
   - Inspiración: Mundo pixelado con exploración y atmósfera misteriosa.

---

El juego contará con un mapa general para seleccionar niveles y un ranking para las mejores "runs" de cada nivel.

---
**GDD**
[Leer el PDF aquí](gdd_mod.pdf)

---
**architecture**

# Arquitectura del Proyecto

Este documento describe la arquitectura del proyecto, sus principales componentes y cómo se relacionan. El juego está desarrollado con **Phaser.js**, una biblioteca en JavaScript para juegos en 2D.

---

## Estructura General

La estructura del proyecto sigue una organización modular:
- **Core del Juego**: Configuración, datos globales y escenas principales.
- **Niveles**: Escenas específicas y clases para cada nivel.
- **Entidades**: Clases individuales para el jugador, enemigos, jefes y otros objetos interactivos.
- **Recursos**: Imágenes, animaciones, configuraciones y datos.

### Estructura de Archivos
├── game.js               # Configuración inicial del juego y carga de escenas.
├── gameData.js           # Gestión de datos globales del jugador.
├── scenes/
│   ├── animations.js     # Precarga de recursos gráficos y animaciones.
│   ├── titlescreen.js    # Pantalla inicial del juego.
│   ├── mainlevels.js     # Selección de niveles y tienda del jugador.
│   ├── levelP.js         # Clase base para niveles.
│   ├── level1.js         # Implementación del nivel 1.
│   ├── Bosses/
│       ├── BossP.js      # Clase base para jefes.
│       ├── boss.js       # Jefe del nivel 1.
│       ├── boss2.js      # Jefe del nivel 2.
│       ├── boss3.js      # Jefe del nivel 3.
│       ├── boss4.js      # Jefe del nivel 4.
│   ├── SubEnemy.js       # Clase para sub-enemigos invocados.
│── entities/
│   ├── player.js         # Clase del jugador.
│   ├── Bullet.js         # Clase para proyectiles.
│   ├── Hud.js            # Interfaz gráfica del jugador (HUD).
├── assets/               # Recursos gráficos y de audio (imágenes, sprites, sonidos).
├── data/
│   ├── items.json        # Configuración de objetos disponibles en la tienda.

---

## Componentes Principales

### **1. Core del Juego**
- **`game.js`**:
  - Configura Phaser.js: Resolución, físicas, escenas y modo de renderizado.
  - Escenas incluidas: `Animations`, `TitleScreen`, `MainLevels`, niveles individuales.

- **`gameData.js`**:
  - Administra datos persistentes como:
    - Vida, daño y habilidades desbloqueadas del jugador.
    - Dinero y objetos comprados en la tienda.

### **2. Escenas**
- **`titlescreen.js`**:
  - Pantalla inicial del juego con opciones básicas como "Iniciar Juego".

- **`mainlevels.js`**:
  - Selección de niveles y tienda del jugador.
  - Carga de datos del jugador desde `gameData.js`.
  - Implementación de la tienda con los objetos definidos en `items.json`.

- **`animations.js`**:
  - Prepara y define animaciones para personajes, jefes y objetos.

### **3. Niveles y Jefes**
- **`levelP.js`**:
  - Clase base para los niveles, encargada de:
    - Creación de entornos.
    - Gestión del jugador, jefe y HUD.

- **Niveles individuales**:
  - Ejemplo: `level1.js` hereda de `levelP.js` y especifica el jefe `Boss`.

- **Jefes**:
  - Cada jefe tiene una clase específica (`boss.js`, `boss2.js`, etc.).
  - Ejemplo: `Boss3` puede invocar sub-enemigos usando la clase `SubEnemy.js`.

### **4. Entidades**
- **Jugador (`player.js`)**:
  - Control del jugador: movimiento, disparo y habilidades especiales.
  - Implementación de ataques especiales basados en objetos comprados en la tienda.

- **Proyectiles (`Bullet.js`)**:
  - Clase base para balas disparadas por el jugador o jefes.

- **Sub-enemigos (`SubEnemy.js`)**:
  - Pequeños enemigos invocados por ciertos jefes.

### **5. HUD**
- **`Hud.js`**:
  - Interfaz gráfica del jugador:
    - Barra de vida.
    - Barra de energía especial.

### **6. Recursos**
- **`items.json`**:
  - Define los objetos disponibles en la tienda, sus costos y efectos:
    - Ejemplo: `abyss_glass` desbloquea habilidades especiales.
- **Gráficos y sonidos**:
  - Definidos en `animations.js` para uso en las escenas.

## Diagrama de Arquitectura

```plaintext
┌──────────────────────────────────┐
│          game.js                 │
│ Configuración inicial y escenas  │
└───────────┬──────────────────────┘
            │
            ▼
┌──────────────────────────────────┐
│         Escenas                  │
│ titlescreen.js, mainlevels.js    │
│ levelP.js, animations.js         │
└───────────┬──────────────────────┘
            │
            ▼
┌──────────────────────────────────┐
│         Entidades                │
│ player.js, Bullet.js, Hud.js     │
│ SubEnemy.js                      │
└───────────┬──────────────────────┘
            │
            ▼
┌──────────────────────────────────┐
│         Jefes y Niveles          │
│ boss.js, boss2.js, ...           │
│ level1.js, level2.js, ...        │
└──────────────────────────────────┘





Enlace a Github
https://github.com/josepk01/PVLI2024 (Os envie invitacion al repo a pabgut02@ucm.es y
toni@ucm.es)
Enlace a RedesSociales
Telegram : https://t.me/+kzyodmOK2uthOGVk
