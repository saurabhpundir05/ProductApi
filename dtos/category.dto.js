// DTO for Adding Categories
class addDTO {
  constructor({ c_name }) {
    this.name = c_name;
  }

  validate() {
    if (!this.name) {
      throw new Error("Category name is required");
    }
  }
}

class deleteDTO {
  constructor({ c_id }) {
    this.id = c_id;
  }
  validate() {
    if (!this.id) {
      throw new Error("Category id is required");
    }
  }
}
module.exports = { addDTO, deleteDTO };
