package com.wp.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.wp.ecommerce.entity.ProductCategory;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4201")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
