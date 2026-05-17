import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

import AdminSidebar from '../components/AdminSidebar';


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import { Legend } from 'recharts';

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalShipments: 0,
        pendingShipments: 0,
        deliveredShipments: 0,
        averageWeight: 0,
        busiestDay: { _id: 'Sin datos', count: 0 },
        mostCommonRegion: { _id: 'Sin datos', count: 0 },
        shipmentsByRegion: [],
        shipmentsByStatus: [],
        shipmentsByDay: [],
        shipmentsByMonth: [],
        frequentClients: []
    });

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {

            const response = await api.get('/admin/dashboard-stats');

            setStats(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div className="dashboard-page">

            <AdminSidebar />

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <h1>
                        Panel administrativo
                    </h1>

                    <p className="dashboard-date">
                        Monitoreo general de operaciones  |  <b> </b>
                        {/*{new Date().toLocaleDateString()}*/}

                        {((d) => {
                            const m = d.toLocaleDateString('es-ES', { month: 'long' });
                            return `${d.getDate()} de ${m.slice()} de ${d.getFullYear()}`;
                        })(new Date())}
                    </p>

                </div>



                <div className="stats-grid">
                    <div className="stats-card">
                        <h3>Total usuarios</h3>
                        <span>{stats.totalUsers}</span>
                    </div>

                    <div className="stats-card">
                        <h3>Total envíos</h3>
                        <span>{stats.totalShipments}</span>
                    </div>

                    <div className="stats-card">
                        <h3>Pendientes</h3>
                        <span>{stats.pendingShipments}</span>
                    </div>

                    <div className="stats-card">
                        <h3>Entregados</h3>
                        <span>{stats.deliveredShipments}</span>
                    </div>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>Día con más envíos</h3>
                        <p>{stats.busiestDay?._id}</p>
                        <span>{stats.busiestDay?.count} envíos</span>
                    </div>

                    <div className="metric-card">
                        <h3>Peso promedio</h3>
                        <p>{Number(stats.averageWeight).toFixed(2)} kg</p>
                        <span>por paquete</span>
                    </div>

                    <div className="metric-card">
                        <h3>Región más común</h3>
                        <p>{stats.mostCommonRegion?._id}</p>
                        <span>{stats.mostCommonRegion?.count} envíos</span>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h2>Envíos por región</h2>

                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={stats.shipmentsByRegion || []}>
                                <XAxis dataKey="_id" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#11a7e5" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h2>Envíos por estado</h2>

                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={stats.shipmentsByStatus || []}
                                    dataKey="count"
                                    nameKey="_id"
                                    outerRadius={95}
                                    label
                                >
                                    {(stats.shipmentsByStatus || []).map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={['#2b2463', '#11a7e5', '#7f5af0'][index % 3]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card full-width-chart">
                    <h2>Envíos por mes</h2>

                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={stats.shipmentsByMonth || []}>
                            <XAxis dataKey="_id" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2b2463" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="dashboard-section">
                    <h2>Clientes más frecuentes</h2>

                    <div className="table-container small-table">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Correo</th>
                                    <th>Envíos</th>
                                </tr>
                            </thead>

                            <tbody>
                                {(stats.frequentClients || []).map((client, index) => (
                                    <tr key={index}>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;