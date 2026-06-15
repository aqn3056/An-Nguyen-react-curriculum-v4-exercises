import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Inline editor for a single multiple-choice option
function OptionEditor({ questionId, option, index, canDelete }) {
  const { dispatch } = useContext(SurveyContext);
  const [workingOption, setWorkingOption] = useState(option);

  const handleSaveOption = () => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: { questionId, optionIndex: index, newText: workingOption },
    });
  };

  const handleDeleteOption = () => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId, optionIndex: index },
    });
  };

  return (
    <li className={styles['option-item']}>
      <input
        type="text"
        className={styles['option-input']}
        value={workingOption}
        onChange={(e) => setWorkingOption(e.target.value)}
      />
      <div className={styles['option-actions']}>
        <button
          className={styles['option-edit-btn']}
          onClick={handleSaveOption}
        >
          Save
        </button>
        <button
          className={styles['option-delete-btn']}
          onClick={handleDeleteOption}
          disabled={!canDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

// Question Item Component
export function QuestionItem({ question }) {
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: null },
      });
    } else {
      setWorkingText(question.question);
      dispatch({
        type: 'SET_EDITING_QUESTION',
        payload: { questionId: question.id },
      });
    }
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { id: question.id },
      });
    }
  };

  const handleAddOption = () => {
    const optionText = prompt('Enter new option text:');
    if (optionText && optionText.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: { questionId: question.id, optionText: optionText.trim() },
      });
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className={styles['question-content']}>
        {isEditing ? (
          <div className={styles['title-edit']}>
            <input
              type="text"
              className={styles['title-input']}
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />
            <div className={styles['title-actions']}>
              <button className={styles['save-btn']} onClick={handleSave}>
                Save
              </button>
              <button className={styles['cancel-btn']} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) =>
              isEditing ? (
                <OptionEditor
                  key={index}
                  questionId={question.id}
                  option={option}
                  index={index}
                  canDelete={question.options.length > 2}
                />
              ) : (
                <li key={index} className={styles['option-item']}>
                  <span className={styles['option-text']}>{option}</span>
                </li>
              )
            )}
          </ul>
          {isEditing && (
            <button
              className={styles['add-option-btn']}
              onClick={handleAddOption}
            >
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
