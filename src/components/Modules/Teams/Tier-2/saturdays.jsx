import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useCollapse } from "react-collapsed";

// Import the Excel file as a URL
import saturdayMetricsUrl from '../../../../assets/xlsx/Saturday Metric Tracking.xlsx?url';

export default function Saturdays() {
    const [data, setData] = useState({ headers: [], rows: [] });
    const [loading, setLoading] = useState(true);

    // Function to parse Excel data with formatting
    const parseExcelData = (arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { 
            type: 'array',
            cellDates: true,    // Parse dates as JS Date objects
            cellNF: true,       // Keep number format info
            cellStyles: true    // Keep style info
        });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Get the range of cells
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const headers = [];
        const rows = [];
        
        // Helper to format cell value based on its type and format
        const formatCellValue = (cell) => {
            if (!cell) return '';
            
            // If cell has a formatted text value, use it
            if (cell.w) return cell.w;
            
            // Handle dates
            if (cell.t === 'd' && cell.v instanceof Date) {
                // Check if it's a time-only value (date part is Excel epoch)
                const date = cell.v;
                const hours = date.getHours();
                const minutes = date.getMinutes();
                
                // If the date is near Excel's epoch (1899-12-30), it's likely time-only
                if (date.getFullYear() === 1899 || date.getFullYear() === 1900) {
                    // Format as time
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
                
                // Otherwise format as date or datetime
                const dateStr = date.toLocaleDateString();
                if (hours === 0 && minutes === 0) {
                    return dateStr;
                }
                return `${dateStr} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            }
            
            // Handle numbers that might be times (0-1 range often = time)
            if (cell.t === 'n' && cell.z && (cell.z.includes('h') || cell.z.includes(':') || cell.z.includes('AM') || cell.z.includes('PM'))) {
                // It's a time format - convert the number to time
                const totalMinutes = Math.round(cell.v * 24 * 60);
                const hours = Math.floor(totalMinutes / 60) % 24;
                const minutes = totalMinutes % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            }
            
            // Return raw value for other types
            return cell.v ?? '';
        };
        
        // Extract headers (first row)
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
            const cell = worksheet[cellAddress];
            headers.push(formatCellValue(cell));
        }
        
        // Extract data rows
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            const rowData = [];
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = worksheet[cellAddress];
                rowData.push(formatCellValue(cell));
            }
            rows.push(rowData);
        }
        
        setData({ headers, rows });
    };

    // Load default file on mount
    useEffect(() => {
        const loadDefaultFile = async () => {
            try {
                const response = await fetch(saturdayMetricsUrl);
                const arrayBuffer = await response.arrayBuffer();
                parseExcelData(arrayBuffer);
            } catch (error) {
                console.error('Error loading default Excel file:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadDefaultFile();
    }, []);

const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return ( 
        <section className="mx-auto p-10 w-[80%] bg-gray-700 rounded" aria-labelledby="saturday-team-title">
            <div id="team-info-container">
                <h2 className="text-[20pt] font-semibold text-white mb-3" id="saturday-team-title">Saturday Support</h2>
                <ul>
                    <li className="text-md underline text-white mb-2">Saturday information</li>
                    <li className="text-gray-300">
                        Slack: <a href="https://lightspeeddms.slack.com/archives/C0514C3T3EF" target="_blank" rel="noopener noreferrer" className="text-bs-secondary hover:underline">#support-saturday</a>
                    </li>
                </ul>
            </div>
            <div id="excel-section" >
                <div id="excel-header" className="flex items-center justify-between border-b-2 border-gray-300 pt-4">
                    <button className="mb-4 mt-4 text-white bg-bs-secondary hover:bg-bs-secondary-600 font-medium py-2 px-4 rounded" {...getToggleProps()}>
                        {isExpanded ? "Collapse" : "Expand"}
                    </button>
                </div>
                <div id="excel-container" className="mt-6" {...getCollapseProps()}>
                    <label className="block mb-2 text-white font-medium">Saturday Metric Tracking</label>
                    {loading ? (
                        <p className="text-gray-300">Loading Saturday Metric Tracking...</p>
                    ) : data.rows.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded p-2 mt-4 h-[400px] overflow-y-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-200 font-semibold">
                                    <tr>
                                        {data.headers.map((header, idx) => (
                                            <th key={idx} className="px-3 py-2 border-b text-black">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            {data.headers.map((_, colIdx) => (
                                                <td key={colIdx} className="px-3 py-2 border-b text-black">{row[colIdx] ?? ''}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-300">No data available</p>
                    )}
                </div>
            </div>
        </section>
    );
}