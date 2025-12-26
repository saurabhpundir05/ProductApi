// DTO for Product Response
class ProductResponseDTO {
  constructor(products) {
    this.pid = products.p_id;
    this.name = products.p_name;
    this.price = products.price;
    this.c_id = products.c_id;
  }
}

// DTO for Adding Product
class addDTO {
  constructor({ p_name, price, c_id }) {
    this.name = p_name?.trim();
    this.price = Number(price);
    this.c_id = c_id ?? null;
  }

  validate() {
    if (!this.name) {
      throw new Error("Product name is required");
    }
    if (isNaN(this.price) || this.price <= 0) {
      throw new Error("Price must be a positive number");
    }
  }
}

// DTO for Adding Product
class updateDTO {
  constructor({ p_id, p_name, price, c_id }) {
    this.p_id = p_id;
    this.name = p_name;
    this.price = price;
    this.c_id = c_id;
  }
  //validate if all fields required and correct
  validate() {
    if (
      this.p_id == null ||
      this.name == null ||
      this.price == null ||
      this.c_id == null
    ) {
      throw new Error("Name, price and c_id are required");
    }
  }
}
// DTO for Deleting Product
class deleteDTO {
  constructor({ p_id }) {
    this.p_id = p_id;
  }
  //validate if all fields required and correct
  validate() {
    if (this.p_id == null) {
      throw new Error("p_id is required");
    }
  }
}

module.exports = { ProductResponseDTO, addDTO, updateDTO, deleteDTO };
