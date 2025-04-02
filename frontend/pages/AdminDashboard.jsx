import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showBanModal, setShowBanModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = (user) => {
    setSelectedUser(user);
    setShowBanModal(true);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading users data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="alert alert-error max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Error!</h3>
            <div className="text-sm">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
        
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="flex rounded-xl justify-between items-center mb-6 px-6" data-theme="sunset">
          <h1 className="text-2xl font-bold" >User Management</h1>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">{users.length}</div>
            </div>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <div key={user.id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.imageUrl || "/api/placeholder/100/100"} alt={user.firstName || 'User'} />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {user.firstName} {user.lastName || ''}
                  {user.banned && <div className="badge badge-error">Banned</div>}
                </h2>
                <p className="text-sm">{user.emailAddresses?.[0]?.emailAddress || 'No email'}</p>
                <div className="divider my-1"></div>
                <div className="w-full flex justify-between text-xs">
                  <span>Joined:</span>
                  <span>{formatDate(user.createdAt)}</span>
                </div>
                <div className="w-full flex justify-between text-xs">
                  <span>Last active:</span>
                  <span>{formatDate(user.lastActiveAt)}</span>
                </div>
                <div className="w-full flex justify-between text-xs">
                  <span>2FA:</span>
                  <span>{user.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button 
                    className="btn btn-primary btn-sm" 
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-error btn-sm" 
                    onClick={() => handleBanUser(user)}
                    disabled={user.banned}
                  >
                    {user.banned ? 'Banned' : 'Ban User'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ban Modal */}
      {showBanModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Ban</h3>
            <p className="py-4">
              Are you sure you want to ban user <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName || ''}</span>?
            </p>
            <div className="modal-action">
              <button 
                className="btn btn-outline"
                onClick={() => setShowBanModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error"
                onClick={() => {
                  setShowBanModal(false);
                  // Here you would handle the actual ban API call
                  alert(`The user ${selectedUser.firstName} ${selectedUser.lastName || ''} is banned.`);
                }}
              >
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg">User Details</h3>
            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6">
               
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">User ID</span>
                      </label>
                      <input type="text" value={selectedUser.id} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input type="text" value={`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input type="text" value={selectedUser.emailAddresses?.[0]?.emailAddress || 'No email'} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Auth Provider</span>
                      </label>
                      <input type="text" value={selectedUser.externalAccounts?.[0]?.provider || 'Direct'} className="input input-bordered" readOnly />
                    </div>
                  </div>
                  
                  <div className="divider">Security Info</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password Enabled</span>
                      </label>
                      <input type="text" value={selectedUser.passwordEnabled ? 'Yes' : 'No'} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">2FA Enabled</span>
                      </label>
                      <input type="text" value={selectedUser.twoFactorEnabled ? 'Yes' : 'No'} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">TOTP Enabled</span>
                      </label>
                      <input type="text" value={selectedUser.totpEnabled ? 'Yes' : 'No'} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Backup Codes</span>
                      </label>
                      <input type="text" value={selectedUser.backupCodeEnabled ? 'Enabled' : 'Disabled'} className="input input-bordered" readOnly />
                    </div>
                  </div>
                  
                  <div className="divider">Activity</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Created At</span>
                      </label>
                      <input type="text" value={formatDate(selectedUser.createdAt)} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Last Active</span>
                      </label>
                      <input type="text" value={formatDate(selectedUser.lastActiveAt)} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Last Sign In</span>
                      </label>
                      <input type="text" value={formatDate(selectedUser.lastSignInAt)} className="input input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Status</span>
                      </label>
                      <input 
                        type="text" 
                        value={
                          selectedUser.banned ? 'Banned' : 
                          selectedUser.locked ? 'Locked' : 'Active'
                        } 
                        className={`input input-bordered ${selectedUser.banned || selectedUser.locked ? 'text-error' : 'text-success'}`} 
                        readOnly 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button 
                className="btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
              {!selectedUser.banned && (
                <button 
                  className="btn btn-error"
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleBanUser(selectedUser);
                  }}
                >
                  Ban User
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default AdminDashboard;