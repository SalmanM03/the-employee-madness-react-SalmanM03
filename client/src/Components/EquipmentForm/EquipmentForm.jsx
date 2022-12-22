const EquipmentForm = ({ onSave, disabled, employee: equipment, onCancel }) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const entries = [...formData.entries()];
  
      const equipment = entries.reduce((acc, entry) => {
        const [k, v] = entry;
        acc[k] = v;
        return acc;
      }, {});
  
      return onSave(equipment);
    };
  
    return (
      <form className="EquipmentForm" onSubmit={onSubmit}>
        {equipment && (
          <input type="hidden" name="_id" defaultValue={equipment._id} />
        )}
  
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={equipment ? equipment.name : null}
            name="name"
            id="name"
          />
        </div>
  
        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            defaultValue={equipment ? equipment.level : null}
            name="level"
            id="level"
          />
        </div>
  
        <div className="control">
          <label htmlFor="amout">Amount:</label>
          <input
            defaultValue={equipment ? equipment.amount : null}
            name="amount"
            id="amount"
          />
        </div>
        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {"Create Equipment"}
          </button>
  
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  };
  
  export default EquipmentForm;
  