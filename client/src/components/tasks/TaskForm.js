import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTask, getTasks, updateTask, clearTask } from 'actions/task';
import PropTypes from 'prop-types';
import { PRIORITIES } from 'constants';

/**
 * TaskForm
 *
 * @param {Object}     task
 * @param {Function}   addTask
 * @param {Function}   getTasks
 * @param {Function}   clearTask
 * @param {Function}   updateTask
 */
const TaskForm = ({ task, addTask, getTasks, clearTask, updateTask }) => {
  const { task: selectedTask } = task;
  const isSelected = Object.keys(selectedTask).length > 0;
  const [searchParams] = useSearchParams({});
  const [formData, setFormData] = useState({
    title: '',
    priority: ''
  });

  useEffect(() => {
    if (isSelected) {
      setFormData(selectedTask);
    } else {
      setFormData({ title: '', priority: '' });
    }
    
  }, [selectedTask, isSelected])

  const { title, priority } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (isSelected) {
      updateTask(selectedTask._id, formData);
    } else {
      addTask({ title, priority });
    }
    setFormData({ title: '', priority: '' });
    getTasks(searchParams.get("page"));
  }

  return (
    <div>
      <div className="task-form">
        <div className={`bg-${isSelected ? 'success' : 'primary'} p`}>
          <h3>{isSelected ? "Update the" : "Add any"} action item in your list...</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="title"
            cols="30"
            rows="5"
            placeholder="Create a task"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
          <label>Set the priority</label>
          <select value={priority} name="priority" className="form-control" onChange={(e) => onChange(e)} required>
            <option value="">Select an option...</option>
            {
              Object.values(PRIORITIES).map((priority, index) => (
                <option key={index} value={index + 1}>{priority}</option>
              ))
            }
          </select>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
          {isSelected && <button onClick={() => clearTask(selectedTask._id)} className="btn btn-danger">Cancel</button>}
        </form>
      </div>      
    </div>
  )
}

const mapStateToProps = state => ({
  task: state.task,
});

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  clearTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addTask, getTasks, clearTask, updateTask })(TaskForm)
