import { UINT32_SIZE } from "./constants";

class RandomEngine {
  private static instance: RandomEngine | null;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new RandomEngine();
  }

  public next = () => {
    return (Math.random() * UINT32_SIZE) | 0;
  };
}

const rankdomEngine = RandomEngine.getInstance();

export { rankdomEngine };
