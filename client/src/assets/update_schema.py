import json

# Load the JSON data
with open("2024_ListOfLargeMF_Buildings_0008.json", "r") as file:
    buildings_data = json.load(file)


# Function to update the schema
def update_schema(building):
    return {
        "buildingId": building["Building ID:"],
        "streetAddress": building["Street Address:"],
        "buildingSize": building["Building Size:"],
        "propertyUse1st": building["Property Use 1st:"],
        "propertyUse2nd": building.get("Property Use 2nd:", ""),
        "propertyUse3rd": building.get("Property Use 3rd:", ""),
        "benchmarkingStatus": building["Benchmarking Status:"],
        "currentSiteEUI": building["Current Site EUI:"],
        "baseline2019EUI": building["Baseline 2019 EUI:"],
        "firstTarget2025EUI": building["1st Target 2025 EUI:"],
        "secondTarget2027EUI": building["2nd Target 2027 EUI:"],
        "finalTarget2030EUI": building["Final Target 2030 EUI:"],
    }


# Update schema for all buildings
updated_buildings = [update_schema(building) for building in buildings_data]

# Save the updated buildings data to a new JSON file
with open("updated_buildings.json", "w") as file:
    json.dump(updated_buildings, file, indent=4)

print("Updated JSON file created successfully.")
