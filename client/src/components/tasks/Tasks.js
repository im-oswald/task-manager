import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasks } from 'actions/task';
import { Spinner } from 'components/spinner';
import { TaskForm, TaskItem } from 'components/tasks';

/**
 * Tasks
 *
 * @param {Object}     task
 * @param {Function}   getTasks
 */
const Tasks = ({ task, getTasks }) => {
  const { tasks, loading } = task;

  useEffect(() => {
    getTasks();
  }, [getTasks, loading]);

  return (
    <Fragment>
      <div className='container'>
        { loading ? <Spinner /> : <div>
          <h1 className="large text-primary">
            Tasks
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Manage your tasks!</p>
          <TaskForm />
          <div className="tasks">
            { tasks.length ? tasks.map((task) => <TaskItem key={task._id} task={task} />) : <h4>No tasks found</h4> }
          </div>
        </div>
        }
      </div>
    </Fragment>
  )
}

Tasks.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task
})

export default connect(mapStateToProps, { getTasks })(Tasks);
