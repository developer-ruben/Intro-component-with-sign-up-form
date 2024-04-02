class App {
  constructor() {
    document
      .getElementById("form")
      .addEventListener("submit", this._onSubmit.bind(this));

    document.querySelectorAll("input").forEach((input) => {
      input.addEventListener("keyup", this._checkField);
    });
  }

  _checkField(e) {
    const value = e.target.value;

    if (value !== "") {
      e.target.parentElement.classList.remove("form__group--error");
    }
  }

  _validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  _getFieldName(field) {
    const fieldName = field.split("-");
    fieldName.forEach((name, index) => {
      fieldName[index] = name.charAt(0).toUpperCase() + name.slice(1);
    });
    return fieldName.join(" ");
  }

  _onSubmit(e) {
    e.preventDefault();

    const fields = ["first-name", "last-name", "email", "password"];

    let error = 0;

    fields.forEach((field) => {
      const input = document.getElementById(field);
      input.parentElement.classList.remove("form__group--success");

      let fieldName = this._getFieldName(field);

      if (input.value === "") {
        error++;
        input.parentElement.classList.add("form__group--error");
        input.nextElementSibling.textContent = fieldName + " cannot be empty";
        return;
      }

      if (field === "email") {
        if (!this._validateEmail(input.value)) {
          error++;
          input.parentElement.classList.add("form__group--error");
          input.nextElementSibling.textContent =
            "Looks like this is not an email";
          return;
        }
      }

      input.parentElement.classList.add("form__group--success");
    });

    if (error > 0) {
      return;
    }
  }
}

const app = new App();
