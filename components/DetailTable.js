import React from "react";

export default function DetailTable({ data }) {
  return (
    <div className=" mt-5 md:mt-10 grid md:grid-cols-2 md:gap-6">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="grid grid-cols-2">
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">District</div>
                    </td>
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {data?.district}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody className="bg-white divide-y divide-gray-200 mt-4">
                  <tr className="grid grid-cols-2">
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Locality</div>
                    </td>
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {data?.locality}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tbody className="bg-white divide-y divide-gray-200 mt-4">
                  <tr className="grid grid-cols-2">
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Town</div>
                    </td>
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {data?.town}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                {/* <tbody className="bg-white divide-y divide-gray-200 mt-4">
                  <tr className="grid grid-cols-2">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Street</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                          {data?.locality}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody> */}
                <tbody className="bg-white divide-y divide-gray-200 mt-4">
                  <tr className="grid grid-cols-2">
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">State</div>
                    </td>
                    <td className="lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {data?.state}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="grid grid-cols-2">
                    <td className="lg:px-6 py-4 whitespace-nowrap ">
                      <div className="text-sm text-gray-900">Ownership</div>
                    </td>
                    <td className="lg:px-6 py-4 whitespace-nowrap  ">
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div
                            className="text-sm font-medium text-gray-900"
                            style={{ textTransform: "capitalize" }}
                          >
                            {data?.ownership}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                {data?.propType === "residential apartments" ||
                data?.propType === "residential house-villa" ||
                data?.propType === "residential other" ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Ready to moves
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.readyToMove ? "Yes" : "No"}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
                {data?.floorNo ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Floor No</div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.floorNo}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}

                {data?.totalFloors ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Total floors
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.totalFloors}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}

                {data?.constructedYear ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Constructed year
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.constructedYear}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
                {data?.plotArea ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Plot area</div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.plotArea} {data?.plotUnit}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
                {data?.usageStatus ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Usage status
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">
                              {data?.usageStatus == "In use"
                                ? "Currently in use"
                                : "Currently not in use"}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
                {data?.agriType ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Agricultural type
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {data?.agriType}
                              {data?.otherAgri ? ", " + data?.otherAgri : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}

                {data?.roadAccess ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Two wheeler access
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {data?.roadAccess.twoWheeler} Meters
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
                {data?.roadAccess ? (
                  <tbody className="bg-white divide-y divide-gray-200 mt-4">
                    <tr className="grid grid-cols-2">
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Four wheeler access
                        </div>
                      </td>
                      <td className="lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900 capitalize">
                              {data?.roadAccess.FourWheeler} Meters
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
