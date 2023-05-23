CREATE TABLE materials (
    id INT PRIMARY KEY,
    material_name VARCHAR(255),
    material_type VARCHAR(255),
    material_class VARCHAR(255),
    density_kg_m3 FLOAT,
    youngs_modulus_gpa FLOAT,
    yield_strength_mpa FLOAT,
    tensile_strength_mpa FLOAT,
    elongation_at_yield_percent FLOAT,
    elongation_at_break_percent FLOAT,
    specific_heat_j_kg_k FLOAT,
    melting_point_k FLOAT,
    thermal_conductivity_w_m_k FLOAT
);