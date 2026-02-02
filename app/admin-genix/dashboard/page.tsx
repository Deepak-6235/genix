'use client';

export default function DashboardPage() {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: '👥', color: 'bg-blue-500' },
    { name: 'Total Products', value: '567', icon: '📦', color: 'bg-green-500' },
    { name: 'Total Orders', value: '890', icon: '🛒', color: 'bg-purple-500' },
    { name: 'Revenue', value: '$12,345', icon: '💰', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
            <span className="text-xl">➕</span>
            <span className="font-medium">Add New Product</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
            <span className="text-xl">👤</span>
            <span className="font-medium">Add New User</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
            <span className="text-xl">📊</span>
            <span className="font-medium">View Reports</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe placed a new order</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              SM
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Sarah Miller registered as a new user</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              AB
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Alex Brown updated product inventory</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
