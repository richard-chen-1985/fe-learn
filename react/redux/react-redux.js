class Provider extends React.Component {
  constructor(props) {
    super(props);

    const { store } = this.props;

    this.state = {
      storeState: store.getState(),
      store
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      if (this.unsubscribe) this.unsubscribe();

      this.subscribe();
    }
  }

  subscribe() {
    const { store } = this.props;

    this.unsubscribe = store.unsubscribe(() => {
      const newStoreState = store.getState();

      if (!this._isMounted) {
        return;
      }

      this.setState(providerState => {
        if (providerState.storeState === newStoreState) {
          return null;
        }
        return { storeState: newStoreState }
      })
    })

    const postMountStoreState = store.getState();
    if (postMountStoreState !== this.state.storeState) {
      this.setState({ storeState: postMountStoreState })
    }
  }

  render() {
    const Context = this.props.context || React.createContext(null);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

module.exports = {
  /**
   * a react component
   */
  Provider: Provider,
  connectAdvanced: function (selectorFactory, options) {
    var Context = options.context;
    return function wrapWithConnect(WrapedComponent) {
      return <WrapedComponent />
    }
  },
  ReactReduxContext: React.createContext(null),
  connect: function createConnect(options) {
    return function connect(mapStateToprops, mapDispatchToProps, mergeProps, opts) {
      return connectAdvanced(options.selectorFactory, {
        //...
      })
    }
  }
}