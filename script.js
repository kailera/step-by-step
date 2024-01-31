isChecked = false;

function toogleCheckbox() {
  isChecked = !isChecked;

  const CheckboxDiv = document.getElementById("checkboxDiv");
  isChecked
    ? (CheckboxDiv.style.backgroundColor = "lightgreen")
    : (CheckboxDiv.style.backgroundColor = "goldenrod");
}
