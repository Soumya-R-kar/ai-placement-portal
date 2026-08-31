import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Rich mock data so the page is always functional and looks great
const mockCompanies = [
  { id: 1, name: 'Google', role: 'Software Engineer', ctc: '₹35 LPA', location: 'Bangalore / Hyderabad', status: 'Open', color: 'bg-blue-500', logo: 'G' },
  { id: 2, name: 'Microsoft', role: 'SDE-1', ctc: '₹32 LPA', location: 'Bangalore / Noida', status: 'Open', color: 'bg-green-600', logo: 'M' },
  { id: 3, name: 'Amazon', role: 'SDE-1', ctc: '₹30 LPA', location: 'Bangalore / Chennai', status: 'Open', color: 'bg-yellow-500', logo: 'A' },
  { id: 4, name: 'Meta', role: 'Software Engineer', ctc: '₹40 LPA', location: 'Hyderabad', status: 'Closed', color: 'bg-blue-600', logo: 'f' },
  { id: 5, name: 'Apple', role: 'iOS Developer', ctc: '₹38 LPA', location: 'Bangalore', status: 'Open', color: 'bg-gray-800', logo: '' },
  { id: 6, name: 'Netflix', role: 'Backend Engineer', ctc: '₹50 LPA', location: 'Hyderabad', status: 'Open', color: 'bg-red-600', logo: 'N' },
  { id: 7, name: 'Adobe', role: 'Member of Technical Staff', ctc: '₹28 LPA', location: 'Noida / Bangalore', status: 'Open', color: 'bg-red-500', logo: 'A' },
  { id: 8, name: 'Uber', role: 'Software Engineer', ctc: '₹42 LPA', location: 'Bangalore', status: 'Closed', color: 'bg-black', logo: 'U' },
];

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Try to fetch from backend, but fallback to mock data instantly if it fails
    axios.get(`${API_URL}/api/companies`)
      .then(res => setCompanies(res.data.companies || mockCompanies))
      .catch(() => {
        console.log("Using mock company data");
        setCompanies(mockCompanies);
      });
  }, []);

  // Filter logic
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) || 
                          company.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">🏢 Top Companies Hiring</h1>
        <p className="opacity-90">Track open roles, CTC, and application statuses for top tech companies.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="🔍 Search by company name or role..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 outline-none transition" 
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Open', 'Closed'].map(status => (
            <button 
              key={status} 
              onClick={() => setFilterStatus(status)} 
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                filterStatus === status 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4 font-medium">
        Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
      </p>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 ${company.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                {company.logo || company.name.charAt(0)}
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                company.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {company.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
            <p className="text-indigo-600 font-semibold mb-3">{company.role}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span className="font-medium text-gray-800">{company.ctc}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{company.location}</span>
              </div>
            </div>

            <button 
              disabled={company.status === 'Closed'}
              className={`w-full py-2.5 rounded-lg font-semibold transition ${
                company.status === 'Open' 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {company.status === 'Open' ? 'View Details & Apply' : 'Applications Closed'}
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCompanies.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-2xl text-gray-400 mb-2">🔍 No companies found</p>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          <button 
            onClick={() => { setSearch(''); setFilterStatus('All'); }} 
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}