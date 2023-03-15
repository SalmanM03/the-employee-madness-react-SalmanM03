const  EquipmentForm = ({ onSave, disabled, employee, onCancel }) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const entries = [...formData.entries()];
  
      const employee = entries.reduce((acc, entry) => {
        const [k, v] = entry;
        acc[k] = v;
        return acc;
      }, {});
  
      return onSave(employee);
    };
  
    console.log("Hallo World",disabled)
    return (
      <form className="EmployeeForm" onSubmit={onSubmit}>
        {employee && (
          <input type="hidden" name="_id" defaultValue={employee._id} />
        )}
  
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={employee ? employee.name : null}
            name="name"
            id="name"
          />
        </div>
  
        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            defaultValue={employee ? employee.level : null}
            name="level"
            id="level"
          />
        </div>
  
        <div className="control">
          <label htmlFor="position">Position:</label>
          <input
            defaultValue={employee ? employee.position : null}
            name="position"
            id="position"
          />
        </div>
        
  
        <div className="buttons">
        <button type="submit">
          {employee ? "Update Equipment" : "Create Employee"}
        </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  };
  

  export default EquipmentForm;