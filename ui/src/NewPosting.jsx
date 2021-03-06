import React from 'react';
import SideBar from './components/SideBar.jsx';

export default function NewPosting(props) {
  const { addPosting } = props;
  return (
    <div className="dogal-space-container">
      <SideBar />
      <PublishPosting addPosting={addPosting} />
    </div>
  );
}

class PublishPosting extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      { id: 1, value: 'Birthday Party' },
      { id: 2, value: 'Make new Friends' },
      { id: 3, value: 'Play Together' },
    ];
    this.handlePublish = this.handlePublish.bind(this);
  }

  async handlePublish(e) {
    e.preventDefault();
    const { publishForm } = document.forms;
    const title = publishForm.title.value;
    const kind = this.options[parseInt(publishForm.kind.value) - 1].value;
    const content = publishForm.content.value;
    const { addPosting } = this.props;
    addPosting(title, kind, content);
  }

  render() {
    const defaultOptions = 0;
    return (
      <div className="publish-container">
        <div className="publish-header">Publish a new Posting</div>
        <form id="publishForm" className="publish-form" onSubmit={this.handlePublish}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Enter activity title." />
          <label htmlFor="kind">Activity Kind:</label>
          <select name="kind" id="kind" defaultValue={defaultOptions} required>
            {this.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
          <label htmlFor="content">Posting Content:</label>
          <textarea id="content" rows="10" placeholder="Enter activity content." />
          <button className="publish-button" type="submit">Publish</button>
        </form>
      </div>
    );
  }
}
