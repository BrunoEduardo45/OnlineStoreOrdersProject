using MediatR;
using Microsoft.AspNetCore.Mvc;
using OnlineStoreOrders.Application.Products.Commands.CreateProduct;
using OnlineStoreOrders.Application.Products.Commands.UpdateProduct;
using OnlineStoreOrders.Application.Products.Commands.DeleteProduct;
using OnlineStoreOrders.Domain.Interfaces;

namespace OnlineStoreOrders.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _readRepo;
        private readonly IProductWriteRepository _writeRepo;
        private readonly IMediator _mediator;

        public ProductsController(
            IProductRepository readRepo,
            IProductWriteRepository writeRepo,
            IMediator mediator)
        {
            _readRepo = readRepo;
            _writeRepo = writeRepo;
            _mediator = mediator;
        }

        // GET /api/products
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _readRepo.GetAllAsync());

        // GET /api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _readRepo.GetByIdAsync(id);
            return product is null ? NotFound() : Ok(product);
        }

        // POST /api/products
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { Id = id });
        }

        // PUT /api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateProductCommand command)
        {
            if (id != command.Id)
                return BadRequest("ID mismatch.");

            var result = await _mediator.Send(command);
            return Ok(result);
        }

        // DELETE /api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteProductCommand(id));
            return result ? NoContent() : NotFound();
        }
    }
}
