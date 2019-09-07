export default function generateKeys() {
  return {
    initializationVector: generateArray(),
    key: generateArray(),
  };
}

function generateArray() {
  return new Array(16).fill(null).map(() => {
    return  Math.floor(Math.random() * Math.floor(255));
  });
}
