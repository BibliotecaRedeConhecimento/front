import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { Button, Form } from "react-bootstrap";
import { addCategory, updateCategory } from "../../services/CategoryServices";

const RegisterCategory = () => {
  const [categoryName, setCategoryName] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await updateCategory("4",{
      name: categoryName,
    });
    console.log(categoryName);
  };

  return (
    <div>
      <PageContainer>
        <PageHeaderContainer title="Cadastrar Categoria" />
        <PageContentContainer>
          <Form   onSubmit={handleSubmit}>
            <Form.Group
              controlId="NameCategory"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="string"
                placeholder="Insira a categoria"
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </Form.Group>
              <Button type="submit">Submit</Button>
          </Form>
        </PageContentContainer>
      </PageContainer>
    </div>
  );
};

export default RegisterCategory;
