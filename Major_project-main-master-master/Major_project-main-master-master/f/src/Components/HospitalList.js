import React from "react";
import './HospitalList.css';


export default function HospitalList() {
  return (
    <div className="Dashheader">
      <div id="example-table_wrapper" className="dataTables_wrapper">
        <table id="example-table" className="table table-bordered table-hover dataTable dtr-inline" role="grid" aria-describedby="example-table_info" style="width: 1171px;">

          <tbody>
            <tr role="row" className="odd">
              <td className="sorting_1" tabindex="0">1</td>
              <td></td>
              <td>Private</td>
              <td><p className="text-danger"><b>Whole Blood</b>Not Available Search for another Component</p></td>
              <td>2023-05-13 10:18:02</td>
              <td>Blood Bank</td>
            </tr>
            <tr role="row" className="even" style="background-color: rgb(240, 170, 173);">
              <td className="sorting_1" tabindex="0">2</td>
              <td>Blood Centre Anmmch,  Gaya</td>
              <td>Govt.</td>
              <td><p className="text-success">Available, AB+Ve:2</p></td>
              <td>2023-05-13 08:21:40</td><td>Blood Bank</td>
            </tr>
            <tr role="row" className="odd" style="background-color: rgb(240, 170, 173);">
              <td className="sorting_1" tabindex="0">3</td>
              <td>SH, Gaya </td>
              <td>Govt.</td><td><p className="text-danger"><b>Whole Blood</b>Not Available Search for another Component</p></td>
              <td>2023-05-12 14:29:46</td>
              <td>BSU</td>
            </tr>
          </tbody>
          <tfoot> <tr><td colspan="6" rowspan="1"> <strong> Disclaimer: The data shown is from the pilot run of e-RaktKosh. Actual data may vary. </strong> </td></tr></tfoot>
          <thead className="bgtablered">
            <tr role="row">
              <th className="sorting_asc" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label="S.No.: activate to sort column descending" aria-sort="ascending" style="width: 41px;">S.No.</th>
              <th className="sorting" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label="Blood Bank: activate to sort column ascending" style="width: 450px;">Blood Bank</th>
              <th className="sorting" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label=" Category : activate to sort column ascending" style="width: 70px;"> Category </th>
              <th className="sorting" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label="Availability: activate to sort column ascending" style="width: 311px;">Availability</th>
              <th className="sorting" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label="Last Updated: activate to sort column ascending" style="width: 122px;">Last Updated</th>
              <th className="sorting" tabindex="0" aria-controls="example-table" rowspan="1" colspan="1" aria-label=" Type : activate to sort column ascending" style="width: 69px;"> Type </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}