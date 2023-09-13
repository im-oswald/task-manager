import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from 'actions/task';
import PropTypes from 'prop-types';
import { PRIORITIES } from 'constants';

/**
 * TaskForm
 *
 * @param {Function}   addTask
 */
const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: ''
  });

  const { title, priority } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addTask({ title, priority });
    setFormData({ title: '', priority: '' });
  }

  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Add any action item in your list...</h3>
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
        </form>
      </div>      
    </div>
  )
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default connect(null, { addTask })(TaskForm)
