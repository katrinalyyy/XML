class StockUrls {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  getStocks() {
    return `${this.baseUrl}/stocks`;
  }

  getStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }

  createStock() {
    return `${this.baseUrl}/stocks`;
  }

  updateStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }

  removeStockById(id) {
    return `${this.baseUrl}/stocks/${id}`;
  }
}

export const stockUrls = new StockUrls();
