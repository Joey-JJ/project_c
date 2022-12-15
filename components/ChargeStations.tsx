import React from "react";

const ChargeStations: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th></th>
            <th>Charging station</th>
            <th>Status</th>
            <th>Occupation status</th>
            <th>Status (color)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <td>Regular 1</td>
            <td className="text-red-600">Charging</td>
            <td>Occupied</td>
            <td>Red</td>
          </tr>

          <tr>
            <th></th>
            <td>Regular 2</td>
            <td className="text-orange-600">Not charging</td>
            <td>Occupied</td>
            <td>Orange</td>
          </tr>

          <tr>
            <th></th>
            <td>Regular 3</td>
            <td className="text-green-600">Not charging</td>
            <td>Free</td>
            <td>Green</td>
          </tr>

          <tr>
            <th></th>
            <td>Regular 4</td>
            <td className="text-green-600">Not charging</td>
            <td>Free</td>
            <td>Green</td>
          </tr>

          <tr>
            <th></th>
            <td>Fast 1</td>
            <td className="text-red-600">Charging</td>
            <td>Occupied</td>
            <td>Red</td>
          </tr>

          <tr>
            <th></th>
            <td>Fast 2</td>
            <td className="text-green-600">Not charging</td>
            <td>Free</td>
            <td>Green</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ChargeStations;
