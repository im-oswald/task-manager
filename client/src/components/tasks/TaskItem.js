import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTask, updateTask, getTasks, selectTask } from 'actions/task';
import { Spinner } from 'components/spinner';
import { PRIORITIES, PRIORITY_OPTIONS } from 'constants';

/**
 * TaskItem
 *
 * @param {Object}     task
 * @param {Object}     auth
 * @param {Function}   deleteTask
 * @param {Function}   updateTask
 * @param {Function}   selectTask
 */
const TaskItem = ({ task, auth, deleteTask, updateTask, selectTask }) => {
  const { _id, title, priority, completed, date, user } = task;
  const { loading } = auth;
  const [searchParams] = useSearchParams({});

  if (loading) {
    return <Spinner />;
  }

  const triggerDelete = async (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this task?");
    if (shouldDelete) {
      await deleteTask(id);
      await getTasks(searchParams.get("page"));
    }
  }

  return (
    <div className="task bg-white p-1 my-1">
      <div>
        <img src="https://www.pngmart.com/files/17/Project-Task-PNG-Transparent-Image.png"  alt="task" />
      </div>
      <div>
        <p className={`badge badge-${PRIORITY_OPTIONS[priority]}`}>{PRIORITIES[priority]}</p>
        <p className="my-1">
          {completed && <i className="fa fa-check mx-1" />}
          <span className={`${completed && 'strikeout-text'}`}>{title}</span>
        </p>
        <p className="task-date">
          Added on <Moment format='MM/DD/YYYY'>{date}</Moment>
        </p>
        {
          completed ? (
            <span className="font-green">Hurray! You completed this task.</span>
          ) : (
            user === auth.user._id && (
              <>
                <button      
                  type="button"
                  className="btn btn-success"
                  onClick={() => updateTask(_id, { completed: true })}>
                  <i className="fas fa-check"></i> Complete
                </button>
                <button      
                  type="button"
                  className="btn btn-primary"
                  onClick={() => selectTask(_id) }>
                  <i className="fa fa-pen"></i> Edit
                </button>
                <button      
                  type="button"
                  className="btn btn-danger"
                  onClick={() => triggerDelete(_id) }>
                  <i className="fas fa-times"></i> Delete
                </button>
              </>
            )
          )
        }
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  selectTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteTask, updateTask, getTasks, selectTask })(TaskItem);