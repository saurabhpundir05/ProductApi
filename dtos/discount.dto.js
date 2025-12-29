class addDTO {
  constructor({ p_id, d_type }) {
    this.id = p_id;
    this.type = d_type;
  }
  validate() {
    if (!this.id || !this.type) {
      throw new Error("p_id and d_type are required");
    }
  }
}
class deleteDTO {
  constructor({ d_id }) {
    this.id = d_id;
  }
  validate() {
    if (!this.id) {
      throw new Error("d_id is required");
    }
  }
}

module.exports = { addDTO, deleteDTO };
