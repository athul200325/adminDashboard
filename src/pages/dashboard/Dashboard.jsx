import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import './Dashboard.css';
import users from '../../data/dummyUsers.js';
import { RxPerson } from 'react-icons/rx';
import { IoGiftOutline } from 'react-icons/io5';
import { CiGrid42 } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ClipLoader } from 'react-spinners'; 

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 

  const usersPerPage = 10;

  const graphData = [
    { month: '0代未満', total: 200, active: 150, other: 50, noAnswer:15 },
    { month: '10代', total: 300, active: 200, other: 100, noAnswer:28 },
    { month: '20代', total: 400, active: 250, other: 150, noAnswer:36 },
    { month: '30代', total: 500, active: 300, other: 200, noAnswer:48 },
    { month: '40代', total: 450, active: 280, other: 170, noAnswer:57 },
    { month: '50代', total: 400, active: 250, other: 150, noAnswer:69 },
    { month: '60代', total: 195, active: 120, other: 75, noAnswer:0 },
    { month: '70代', total: 150, active: 90, other: 60, noAnswer:0 },
    { month: '80代', total: 100, active: 60, other: 40, noAnswer:0 },
    { month: '90代以上', total: 50, active: 40, other: 30, noAnswer:0 },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 500); 
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <nav className="nav-menu">
          <div
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <CiGrid42 className="nav-icon" />
            <span>ダッシュボード</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <Users className="nav-icon" />
            <span>登録ユーザー</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <IoGiftOutline className="nav-icon" />
            <span>当選者</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <RxPerson className="nav-icon" />
            <span>運営管理者</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
      {activeSection === 'dashboard' && (
          <>
            {/* Stats Grid */}
<div className="stats-charts-grid">
  {/* Stat Cards */}
  <div className="stat-card">
    <div className="stat-title">ユーザー数</div>
    <div className="stat-value">
      <span className="number">450</span>
      <span className="unit">人</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">400人 （前月時点の累計）</div>
      <span className="change positive">↑12.5%</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">アクティブユーザー</div>
    <div className="stat-subtitle">2024年2月1日 - 2024年2月5日</div>
    <div className="stat-value">
      <span className="number">50</span>
      <span className="unit">人 / 今月</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">12人 (前月時点）</div>
      <span className="change positive">↑316.6%</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">定着率</div>
    <div className="stat-subtitle">2024年1月1日 - 2024年1月31日</div>
    <div className="stat-value">
      <span className="number">10</span>
      <span className="unit">% / 前月</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">前月比</div>
      <span className="change negative">↓16.6%</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">平均検索回数</div>
    <div className="stat-subtitle">2024年2月1日 - 2024年2月5日</div>
    <div className="stat-value">
      <span className="number">4</span>
      <span className="unit">回 / 今月</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">2回 (前月の今日時点）</div>
      <span className="change positive">↑100%</span>
    </div>
  </div>

  {/* Chart Card */}
  <div className="graph-card">
    <div className="graph-header">
      <h3 className="graph-title">性別・年代比</h3>
      <div className="date-selector">2024年 01月 ▼</div>
    </div>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }}
          domain={[0, 1000]} 
          ticks={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
           />
          <Tooltip />
          <Bar dataKey="total" stackId="a" fill="#FF9500" />
          <Bar dataKey="active" stackId="a" fill="#FFB854" />
          <Bar dataKey="other" stackId="a" fill="#FFCE8A" />
          <Bar dataKey="noAnswer" stackId="a" fill="#FFDEB0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
<div className='color-main'>
      <div className="item-color">
        <div className="color-1"></div>
        <span>男性</span>
      </div>
      <div className="item-color">
        <div className="color-2"></div>
        <span>女性</span>
      </div>
      <div className="item-color">
        <div className="color-3"></div>
        <span>その他</span>
      </div>
      <div className="item-color">
        <div className="color-4"></div>
        <span>回答なし</span>
      </div>
</div>
  </div>

  {/* Additional Stat Cards */}
  <div className="stat-card">
    <div className="stat-title">新規登録者数</div>
    <div className="stat-subtitle">2024年2月1日 - 2024年2月5日</div>
    <div className="stat-value">
      <span className="number">125</span>
      <span className="unit">回 / 今月</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">85回 (前月の今日時点）</div>
      <span className="change positive">↑47%</span>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-title">アカウント削除数</div>
    <div className="stat-subtitle">2024年2月1日 - 2024年2月5日</div>
    <div className="stat-value">
      <span className="number">10</span>
      <span className="unit">人 / 今月</span>
    </div>
    <div className="sub-div">
      <div className="stat-subtitle">8人 (前月の今日時点）</div>
      <span className="change positive">↑25%</span>
    </div>
  </div>
</div>

          </>
        )}

        {activeSection === 'users' && (
          <div className="users-card">
            <div className="table-header">
              <h3 className="table-title">登録ユーザー一覧</h3>
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="ニックネーム / メールアドレスで検索"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {loading ? (
              <div className="spinner-container">
                <ClipLoader color="#FF9500" size={40} />
              </div>
            ) : (
              <div className="">
                {paginatedUsers.length > 0 ? (
                  <div className="table-container">
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>ニックネーム</th>
                          <th>メールアドレス</th>
                          <th>生年月</th>
                          <th>性別</th>
                          <th>居住地</th>
                          <th>登録日</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                            <td>{user.nickname}</td>
                            <td className="email-cell" title={user.email}>
                              {user.email}
                            </td>
                            <td>{user.birthDate}</td>
                            <td>{user.gender}</td>
                            <td>{user.region}</td>
                            <td>{user.registerDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-users-message">該当するユーザーが見つかりません</div>
                )}
              </div>
            )}
            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <IoIosArrowBack />
                </button>
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
                    page <= 5 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2) ? (
                      <button
                        key={page}
                        className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ) : page === currentPage + 3 || page === totalPages - 1 ? (
                      <span key={`dots-${page}`} className="pagination-dots">
                        ...
                      </span>
                    ) : null
                  )}
                </div>
                <p>...</p>
                <button className='pagination-number'>500</button>
                <button
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
