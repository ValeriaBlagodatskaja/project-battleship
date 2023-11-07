import ship from '../src/ship';

describe('Ship factory function properties tests', () => {
  const shipTest = ship('carrier');
  test('id', () => {
    expect(shipTest.id).toBe('carrier');
  });

  test('length', () => {
    expect(shipTest.length).toBe(5);
  });

  test('direction', () => {
    expect(shipTest.getDirection()).toBe('horizontal');
  });

  test('change direction', () => {
    shipTest.changeDirection();
    expect(shipTest.getDirection()).toBe('vertical');
  });
});

describe('Hit function tests', () => {
  test('no hits', () => {
    const shipTest = ship('cruiser');
    expect(shipTest.getHitNum()).toBe(0);
  });
  test('Increases hit number by 1 when called', () => {
    const shipTest = ship('cruiser');
    shipTest.hit();
    expect(shipTest.getHitNum()).toBe(1);
  });
  test('Increases hit number by 2 when called', () => {
    const shipTest = ship('cruiser');
    shipTest.hit();
    shipTest.hit();
    expect(shipTest.getHitNum()).toBe(2);
  });
});

describe('isSunk function tests', () => {
  test('Return true if ship is sunk', () => {
    const shipTest = ship('destroyer');
    shipTest.hit();
    shipTest.hit();
    expect(shipTest.isSunk()).toBe(true);
  });

  test('Return false if ship is hit but not sunk', () => {
    const shipTest = ship('destroyer');
    shipTest.hit();
    expect(shipTest.isSunk()).toBe(false);
  });
});
