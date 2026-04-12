# Database Schema Documentation

[cite_start]This document defines the SQLite database structure

---

## 1. Table: categories
[cite_start]Defines the classification rules for attributes and filters.
* [cite_start]**id**: Unique identifier for the category.
* [cite_start]**name**: The display name of the category.
* [cite_start]**type**: An Enum constraining data to `quantitative`, `qualitative`, or `other`.

## 2. Table: trials
[cite_start]The primary container for experimental setups and visualization parameters.
* [cite_start]**id**: Unique identifier for the trial.
* [cite_start]**name**: The name of the trial.
* [cite_start]**dependant_var**: Mapping for the x-axis visualization. References the `id` of the associated category
* **independant_var**: Mapping for the y-axis visualization. References the `id` of the associated category

## 3. Table: filters
[cite_start]A list of constraints applied to data on a per-trial basis.
* [cite_start]**id**: Unique identifier for the filter.
* **parentId**: References the `id` of the associated trial.
* [cite_start]**category**: References the `id` of the associated category.

## 4. Table: database
[cite_start]The central repository containing raw data entries to be filtered and visualized.
* **id**: Unique identifier for the data entry[cite: 2].
* [cite_start]**notes**: Text field for additional entry information[cite: 2].

## 5. Table: attributes
[cite_start]Specific datapoints associated with data entries, organized by category.
* **id**: Unique identifier for the attribute[cite: 2].
* [cite_start]**parentId**: References the `id` of the parent data entry in the `database` table[cite: 2].
* [cite_start]**category**: References the `id` of the associated category[cite: 2].
* **value**: The actual data, stored in the format specified by the category type[cite: 2].