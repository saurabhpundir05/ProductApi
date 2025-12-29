class addDTO {
  constructor({ d_id, d_flat, d_percent }) {
    this.id = d_id;
    this.flat = d_flat ?? null;
    this.percent = d_percent ?? null;
  }
  validate() {
    if (!this.id) {
      throw new Error("Id is required");
    }
    if (this.flat === null && this.percent === null) {
      throw new Error("Either flat or percent is required");
    }
    if (this.flat !== null && this.percent !== null) {
      throw new Error("Only one of flat or percent is allowed");
    }
  }
}

module.exports = { addDTO };
