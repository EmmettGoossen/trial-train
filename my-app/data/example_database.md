# Database Schema Documentation

This document defines the SQLite database structure

---

## 1. Table: categories
Defines the classification rules for attributes and filters.
* **id**: Unique identifier for the category.
* **name**: The display name of the category.
* **type**: An Enum constraining data to `quantitative`, `qualitative`, or `other`.

## 2. Table: trials
The primary container for experimental setups and visualization parameters.
* **id**: Unique identifier for the trial.
* **name**: The name of the trial.
* **dependant_var**: Mapping for the x-axis visualization. References the `id` of the associated category
* **independant_var**: Mapping for the y-axis visualization. References the `id` of the associated category

## 3. Table: filters
A list of constraints applied to data on a per-trial basis.
* **id**: Unique identifier for the filter.
* **parentId**: References the `id` of the associated trial.
* **category**: References the `id` of the associated category.

## 4. Table: database
The central repository containing raw data entries to be filtered and visualized.
* **id**: Unique identifier for the data entry.
* **notes**: Text field for additional entry information.

## 5. Table: attributes
Specific datapoints associated with data entries, organized by category.
* **id**: Unique identifier for the attribute.
* **parentId**: References the `id` of the parent data entry in the `database` table.
* **category**: References the `id` of the associated category.
* **value**: The actual data, stored in the format specified by the category type.