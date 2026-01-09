# 📥 Bulk Import Guide

## Quick Start

1. Go to: **https://phofinder.vercel.app/import**
2. Prepare your CSV data (see format below)
3. Paste into the text area
4. Click "Import Restaurants"
5. Review results

## CSV Format

### Required Columns
- `name` - Restaurant name
- `address` - Street address
- `city` - City name
- `state` - Full state name (e.g., "California" not "CA")

### Optional Columns
- `zipcode` or `zip` - ZIP code
- `phone` - Phone number
- `website` or `url` - Website URL
- `description` - Restaurant description

## Example CSV

```csv
name,address,city,state,zipcode,phone,website,description
Pho Saigon,123 Main St,San Francisco,California,94102,415-555-1234,https://phosaigon.com,Best pho in SF
Pho 99,456 Market St,Los Angeles,California,90001,213-555-5678,https://pho99.com,Authentic Vietnamese cuisine
Pho Express,"789 Broadway, Suite 100",New York,New York,10001,212-555-9012,https://phoexpress.com,"Great pho, friendly staff"
```

## Tips

1. **From Excel/Google Sheets:**
   - Select your data
   - Copy (Cmd/Ctrl + C)
   - Paste directly into the import page

2. **Handling Commas:**
   - If a field contains commas, wrap it in quotes: `"123 Main St, Suite 100"`
   - The parser handles quoted fields automatically

3. **State Names:**
   - Use full state names: "California", "New York", "New Jersey"
   - Not abbreviations: "CA", "NY", "NJ"

4. **Batch Size:**
   - Import 50-100 restaurants at a time for best results
   - Large batches may take longer

5. **Error Handling:**
   - The import will show which rows succeeded and which failed
   - Fix errors and re-import failed rows

## Common Issues

**"Missing required columns"**
- Make sure your header row includes: name, address, city, state

**"Row X has Y columns but header has Z"**
- Check for extra commas or missing fields in that row
- Make sure all rows have the same number of columns

**"Row X is missing required fields"**
- Ensure name, address, city, and state are filled in for that row

## After Import

- Restaurants appear immediately on the site
- Check the state page to verify: `/state/[StateName]`
- Edit individual restaurants if needed
