export const PlacementTile = (x, y) => {
  const size = 32;
  let color = "rgba(255, 255, 255, 0.3)";
  let occupied = false;

  const draw = (ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  };

  const update = (ctx, mouse) => {
    draw(ctx);
    if (
      mouse.x > x &&
      mouse.x < x + size &&
      mouse.y > y &&
      mouse.y < y + size
    ) {
      color = "white";
    } else {
      color = "rgba(255, 255, 255, 0.3)";
    }
  };

  return { x, y, size, update };
};

export const GeneratePlacementTiles = (placementTilesData) => {
  const tilesGrid = [];

  for (let i = 0; i < placementTilesData.length; i += 40) {
    tilesGrid.push(placementTilesData.slice(i, i + 40));
  }

  const tiles = [];

  tilesGrid.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 451) {
        tiles.push(PlacementTile(x * 32, y * 32));
      }
    });
  });

  return tiles;
};

export const Projectile = (position = { x: 0, y: 0 }) => {
  let x = position.x;
  let y = position.y;
  let velocity = { x: 0, y: 0 };

  const draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
  };

  return { x, y, velocity, draw };
};

export const AddWizard = (x, y) => {
  const width = 32 * 2;
  let projectiles = [Projectile({ x: x, y: y })];
  const draw = (ctx) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, width, 32);
  };

  return { x, y, projectiles, draw };
};

export const handleCanvasClick = (
  event,
  activeTile,
  firstPlayerTiles,
  secondPlayerTiles,
  user,
  socketRef
) => {
  if (user && user.playerType && activeTile && !activeTile.isOccupied) {
    const playerType = user.playerType;
    console.log("click");

    const isFirstPlayerTile = firstPlayerTiles.includes(activeTile);
    const isSecondPlayerTile = secondPlayerTiles.includes(activeTile);

    if (
      (playerType === "firstPlayer" && isFirstPlayerTile) ||
      (playerType === "secondPlayer" && isSecondPlayerTile)
    ) {
      const wizard = { x: activeTile.x, y: activeTile.y };
      socketRef.current.emit("placeWizard", { wizard, playerType });
      activeTile.isOccupied = true;
    }
  }
};

export const activeTileFunction = (arr, mouse) => {
  for (let i = 0; i < arr.length; i++) {
    const tile = arr[i];
    if (
      mouse.x > tile.x &&
      mouse.x < tile.x + tile.size &&
      mouse.y > tile.y &&
      mouse.y < tile.y + tile.size
    ) {
      return tile;
    }
  }
  return null;
};
