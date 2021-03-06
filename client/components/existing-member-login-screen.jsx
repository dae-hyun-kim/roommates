import React from 'react';

export default class ExistingMemberLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      selectedMemberId: ''
    };
    this.getMembers = this.getMembers.bind(this);
    this.memberDropDown = this.memberDropDown.bind(this);
    this.selectInputMember = this.selectInputMember.bind(this);
    this.assignExistingMember = this.assignExistingMember.bind(this);
    this.backToPrevious = this.backToPrevious.bind(this);
  }

  getMembers() {
    fetch('/api/users')
      .then(response => {
        return response.json();
      }).then(result => {
        this.setState({
          members: result
        });
      });
  }

  assignExistingMember(event) {
    event.preventDefault();
    const setViewMethod = this.props.setView;
    const setExistingMemberMethod = this.props.setExistingMember;
    fetch(`/api/users/${this.state.selectedMemberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setViewMethod('my-fridge-screen');
      setExistingMemberMethod(this.state.selectedMemberId);
    });
  }

  selectInputMember(event) {
    event.preventDefault();
    this.setState({
      selectedMemberId: event.currentTarget.value
    });
  }

  backToPrevious() {
    const setViewMethod = this.props.setView;
    setViewMethod('member-login-screen');
  }

  componentDidMount() {
    this.getMembers();
  }

  memberDropDown() {
    const membersList = this.state.members;
    const allMembers = membersList.map(member => {
      return (
        <option key={member.userId} id={member.userId} value={member.userId}>{member.userName}</option>
      );
    });
    return allMembers;
  }

  render() {
    return (
      <div className="text-center mt-3">
        <form>
          <label htmlFor="Existing Members">
            <h4 className="header-font">
            Existing Members:
            </h4>
          </label>
          <div>
            <select name="" className="member-dropdown mt-4 cursive-font login-font-size" onChange={this.selectInputMember}>
              <option>Members</option>
              {this.memberDropDown()}
            </select>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary button-format button-3d action-button animate" onClick={this.assignExistingMember}>Select Member</button>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-danger button-format button-3d-red action-button animate" onClick={this.backToPrevious}>Back</button>
          </div>
        </form>
      </div>
    );
  }
}
