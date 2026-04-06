mport React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <li
        onClick={() => this.props.onSelect(this.props.item.id)}
        style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }}
      >
        <span>{this.props.item.name}</span>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => this.props.onAction(this.props.item.name)}
        >
          アクション
        </button>
      </li>
    );
  }
}

class DataDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      items: [],
      filteredItems: [],
      isLoading: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.initialSearch !== this.props.initialSearch) {
      this.setState({ searchQuery: nextProps.initialSearch });
      this.fetchResults(nextProps.initialSearch);
    }
  }

  componentDidMount() {
    this.fetchResults(this.state.searchQuery);
  }

  handleSearchChange = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });
    this.fetchResults(query);
  };

  // APIリクエストのmock
  fetchResults = (query) => {
    this.setState({ isLoading: true });

    const delay = Math.random() * 2000;
    setTimeout(() => {
      const mockData = [
        { id: 1, name: Result 1 for ${query} },
        { id: 2, name: Result 2 for ${query} },
      ];
      this.setState({
        items: mockData,
        filteredItems: mockData,
        isLoading: false,
      });
    }, delay);
  };

  handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'New Custom Item' };
    this.state.items.push(newItem);
    this.setState({
      items: this.state.items,
      filteredItems: this.state.items
    });
  };

  handleItemAction = (itemName) => {
    // 簡易的な確認ダイアログ
    const confirmed = window.confirm(${itemName} に対するアクションを実行しますか？);
    if (confirmed) {
      console.log(${itemName} のアクションが実行されました);
    }
  };

  render() {
    return (
      <div className="dashboard" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>Data Dashboard</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search..."
          />
          <button onClick={this.handleAddItem} style={{ marginLeft: '10px' }}>
            Add Item
          </button>
        </div>

        {this.state.isLoading && <span> Loading...</span>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {this.state.filteredItems.map(item => (
            <ListItem
              key={item.id}
              item={item}
              onSelect={(id) => console.log('Selected Item ID:', id)}
              onAction={this.handleItemAction}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default DataDashboard;
