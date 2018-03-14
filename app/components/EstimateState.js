import StateComponent from "StateComponent"
import Timing from "Timing"

export default class EstimateState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(EstimateState)

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isEditStateChanging: false
    }
  }

  get estimate() {
    return this.props.estimate
  }

  get onSubmitNew() {
    return this.props.onSubmitNew
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get onSubmitReset() {
    return this.props.onSubmitReset
  }

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  async handleBeginEdit() {
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      Timing.estimateEditStateChange
    )
    this.setState({ isEditing: true })
  }

  async handleSubmitNew(estimate) {
    await this.onSubmitNew(estimate)
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      Timing.estimateEditStateChange
    )
  }

  async handleSubmitEdit(estimate) {
    await this.onSubmitEdit(estimate)
    await this.handleCancelEdit()
  }

  async handleSubmitReset() {
    await this.onSubmitReset(this.estimate)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      Timing.estimateEditStateChange
    )
    this.setState({ isEditing: false })
  }

  renderState() {
    return {
      isEditing: this.isEditing,
      isEditStateChanging: this.isEditStateChanging,
      onSubmitNew: estimate => this.handleSubmitNew(estimate),
      onBeginEdit: () => this.handleBeginEdit(),
      onSubmitEdit: estimate => this.handleSubmitEdit(estimate),
      onCancelEdit: () => this.handleCancelEdit(),
      onSubmitReset: () => this.handleSubmitReset()
    }
  }
}
